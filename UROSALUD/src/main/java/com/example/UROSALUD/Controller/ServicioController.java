package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Dto.ServicioDTO;
import com.example.UROSALUD.Domain.Service.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Servicio")
public class ServicioController {
    @Autowired
    private ServicioService servicioService;

    // Guardar una especialidad con imagen
    @PostMapping("/save")
    public ResponseEntity<String> saveServicio(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("img") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Debe seleccionar un archivo.");
        }

        try {
            ServicioDTO servicioDTO = new ServicioDTO();
            servicioDTO.setNombre(nombre);
            servicioDTO.setDescripcion(descripcion);
            if (!file.isEmpty()) {
                servicioDTO.setImg(file.getBytes());  // Guardar imagen como byte[]
            }

            servicioService.save(servicioDTO);
            return ResponseEntity.ok("Sevicio guardada correctamente.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al procesar la imagen.");
        }
    }


    @GetMapping("/get")
    public List<ServicioDTO> get() {
        return servicioService.getAll();
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody ServicioDTO servicioDTO) {
        Optional<ServicioDTO> servicioOptional = servicioService.findById(servicioDTO.getId());
        if (servicioOptional.isPresent()) {
            servicioService.save(servicioDTO);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
