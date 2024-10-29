package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Service.EspecialidadService;
import com.example.UROSALUD.Persistence.Entity.Especialidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Especialidad")
public class EspecialidadController {
    @Autowired
    private EspecialidadService especialidadService;

    @PostMapping("/save")
    public Especialidad save(@RequestBody Especialidad especialidad){

        return especialidadService.save(especialidad);
    }

    @GetMapping("/get")
    public List<Especialidad> get() {
        return especialidadService.getAll();
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody Especialidad especialidad) {
        Optional<Especialidad> generoOptional = especialidadService.findById(especialidad.getId());
        if (generoOptional.isPresent()) {
            especialidadService.save(especialidad);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
