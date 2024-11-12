package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Dto.CitasDTO;
import com.example.UROSALUD.Domain.Service.CitasService;
import com.example.UROSALUD.Persistence.Entity.Horario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
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

    @PutMapping("/updateHistoria/{id}")
    public ResponseEntity<?> updateHistoria(@PathVariable Long id, @RequestPart(value = "archivo", required = true) MultipartFile archivo) {
        return actualizarArchivo(id, archivo, "Historia");
    }

    @PutMapping("/updateExamen/{id}")
    public ResponseEntity<?> updateExamen(@PathVariable Long id, @RequestPart(value = "archivo", required = true) MultipartFile archivo) {
        return actualizarArchivo(id, archivo, "Examen");
    }

    private ResponseEntity<?> actualizarArchivo(Long id, MultipartFile archivo, String tipoActualizacion) {
        Optional<CitasDTO> citasDTOOptional = citasService.findById(id);
        if (citasDTOOptional.isPresent()) {
            CitasDTO existingCitas = citasDTOOptional.get();

            if (archivo != null && !archivo.isEmpty()) {
                try {
                    // Si la carpeta no existe, se crea
                    Files.createDirectories(Paths.get(uploadDir));

                    // Generar un nombre único para el archivo
                    String uniqueFileName = System.currentTimeMillis() + "_" + archivo.getOriginalFilename();
                    Path targetLocation = Paths.get(uploadDir).resolve(uniqueFileName);
                    Files.copy(archivo.getInputStream(), targetLocation);

                    // Establecer la URL del archivo según el tipo de actualización
                    if ("Historia".equals(tipoActualizacion)) {
                        existingCitas.setArchivoAnswerHistoria(targetLocation.toString());
                    } else if ("Examen".equals(tipoActualizacion)) {
                        existingCitas.setArchivoAnswerMedica(targetLocation.toString());
                    }

                } catch (IOException e) {
                    System.out.println(e);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar el archivo: " + e.getMessage());
                }
            }

            CitasDTO updatedCitasDTO = citasService.save(existingCitas);
            return ResponseEntity.ok(updatedCitasDTO);
        }
        return ResponseEntity.notFound().build();
    }

}
