package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Dto.EspecialidadDTO;
import com.example.UROSALUD.Domain.Service.EspecialidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Especialidad/")
public class EspecialidadController {
    @Autowired
    private EspecialidadService especialidadService;

    @PostMapping("/save")
    public EspecialidadDTO save(@RequestBody EspecialidadDTO especialidadDTO){
        return especialidadService.save(especialidadDTO);
    }

    @GetMapping("/get")
    public List<EspecialidadDTO> get() {
        return especialidadService.getAll();
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody EspecialidadDTO especialidadDTO) {
        Optional<EspecialidadDTO> especialidadOptional = especialidadService.findById(especialidadDTO.getId());
        if (especialidadOptional.isPresent()) {
            especialidadService.save(especialidadDTO);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
