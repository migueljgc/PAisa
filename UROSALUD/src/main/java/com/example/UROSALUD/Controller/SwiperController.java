package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Service.SwiperService;
import com.example.UROSALUD.Persistence.Entity.Swiper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/Swiper")
public class SwiperController {

    @Autowired
    private SwiperService swiperService;

    @GetMapping("/get")
    public List<Swiper> getAll(){
        return swiperService.getAll();
    }

    // Eliminar por ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSwiperById(@PathVariable Long id) {
        try {
            boolean isDeleted = swiperService.deleteById(id);
            if (isDeleted) {
                return ResponseEntity.ok("Swiper borrado exitosamente");
            } else {
                return ResponseEntity.status(404).body("Swiper no encotrado");
            }
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error borrando swiper");
        }
    }
    @PostMapping("/save")
    public ResponseEntity<String> save(
            @RequestParam("nombre") String nombre,
            @RequestParam("img") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Debe seleccionar un archivo.");
        }

        try {
            Swiper swiper = new Swiper();
            swiper.setNombre(nombre);
            if (!file.isEmpty()) {
                swiper.setImg(file.getBytes());  // Guardar imagen como byte[]
            }

            swiperService.save(swiper);
            return ResponseEntity.ok("swiper guardada correctamente.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al procesar la imagen.");
        }
    }
}
