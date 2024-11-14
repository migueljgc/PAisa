package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Dto.CitasDTO;
import com.example.UROSALUD.Domain.Service.CitasService;
import com.example.UROSALUD.Persistence.Entity.Horario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Citas")
public class CitasController {
    @Autowired
    private CitasService citasService;

    // Ruta para guardar archivos
    @Value("${file.upload-dir:/var/data/uploads}")
    private String uploadDir;

    @PostMapping("/save")
    public CitasDTO save(@RequestBody CitasDTO citasDTO){
        return citasService.save(citasDTO);
    }

    @GetMapping("/get")
    public List<CitasDTO> get() {
        return citasService.getAll();
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody CitasDTO citasDTO) {
        Optional<CitasDTO> especialidadOptional = citasService.findById(citasDTO.getId());
        if (especialidadOptional.isPresent()) {
            citasService.save(citasDTO);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/doctor/{doctorId}")
    public List<Horario> obtenerHorariosDisponibles(@PathVariable Long doctorId) {
        return citasService.obtenerHorariosDisponibles(doctorId);
    }

    @PostMapping("/reservar")
    public ResponseEntity<String> reservarCita(@RequestParam Long doctorId, @RequestParam String hora) {
        LocalTime horaCita = LocalTime.parse(hora);
        boolean reservada = citasService.reservarCita(doctorId, horaCita);
        if (reservada) {
            return ResponseEntity.ok("Cita reservada exitosamente");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No hay citas disponibles en esa hora");
        }
    }

    // Endpoint para actualizar la historia clínica
    @PutMapping("/updateHistoria/{id}")
    public ResponseEntity<?> updateHistoria(@PathVariable Long id, @RequestPart(value = "archivo", required = true) MultipartFile archivo) {
        Optional<CitasDTO> citasDTOOptional = citasService.findById(id);

        if (citasDTOOptional.isPresent()) {
            CitasDTO existingCitas = citasDTOOptional.get();

            if (archivo != null && !archivo.isEmpty()) {
                try {
                    //Si la Carpeta no Existe se crea
                    //Files.createDirectories(fileStorageLocation);
                    Files.createDirectories(Paths.get(uploadDir));

                    // Guardar el archivo
                    String fileName = archivo.getOriginalFilename();
                    System.out.println(fileName);

                    // Generar un nombre único para el archivo (ejemplo con timestamp)
                    String uniqueFileName = System.currentTimeMillis() + "_" + fileName;
                    System.out.println(uniqueFileName);

                    Path targetLocation = Paths.get(uploadDir).resolve(uniqueFileName);
                    System.out.println("target"+targetLocation);

                    // Asegúrate de usar `StandardCopyOption.REPLACE_EXISTING` para evitar problemas de sobrescritura
                    Files.copy(archivo.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

                    // Guardar la ruta del archivo en la historia clínica
                    existingCitas.setArchivoAnswerHistoria(targetLocation.toString());

                    // Guardar en la base de datos
                    CitasDTO updatedCitasDTO = citasService.saveHistoria(existingCitas);
                    System.out.println(updatedCitasDTO);
                    return ResponseEntity.ok(updatedCitasDTO);

                } catch (IOException e) {
                    System.out.println(e);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Error al procesar el archivo de historia clínica: " + e.getMessage());
                }
            }
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoint para actualizar el examen médico
    @PutMapping("/updateExamen/{id}")
    public ResponseEntity<?> updateExamen(@PathVariable Long id, @RequestPart(value = "archivo", required = true) MultipartFile archivo) {
        Optional<CitasDTO> citasDTOOptional = citasService.findById(id);

        if (citasDTOOptional.isPresent()) {
            CitasDTO existingCitas = citasDTOOptional.get();

            if (archivo != null && !archivo.isEmpty()) {
                try {
                    //Si la Carpeta no Existe se crea
                    //Files.createDirectories(fileStorageLocation);
                    Files.createDirectories(Paths.get(uploadDir));

                    // Guardar el archivo
                    String fileName = archivo.getOriginalFilename();
                    System.out.println(fileName);

                    // Generar un nombre único para el archivo (ejemplo con timestamp)
                    String uniqueFileName = System.currentTimeMillis() + "_" + fileName;
                    System.out.println(uniqueFileName);

                    Path targetLocation = Paths.get(uploadDir).resolve(uniqueFileName);
                    System.out.println("target"+targetLocation);

                    // Asegúrate de usar `StandardCopyOption.REPLACE_EXISTING` para evitar problemas de sobrescritura
                    Files.copy(archivo.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

                    // Guardar la ruta del archivo en el examen médico
                    existingCitas.setArchivoAnswerMedica(targetLocation.toString());

                    // Guardar en la base de datos
                    CitasDTO updatedCitasDTO = citasService.saveExamen(existingCitas);
                    System.out.println(updatedCitasDTO);
                    return ResponseEntity.ok(updatedCitasDTO);

                } catch (IOException e) {
                    System.out.println(e);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Error al procesar el archivo de examen médico: " + e.getMessage());
                }
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

                if (resource.exists()) {
                    return ResponseEntity.ok()
                            .contentType(MediaType.valueOf(Files.probeContentType(filePath)))
                            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                            .body(resource);
                } else {
                    return ResponseEntity.notFound().build();
                }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}


