package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Dto.ExamenesDTO;
import com.example.UROSALUD.Domain.Service.ExamenesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Examenes/")
public class ExamenesController {
    @Autowired
    private ExamenesService examenesService;

    @PostMapping("/save")
    public ExamenesDTO save(@RequestBody ExamenesDTO examenesDTO){
        return examenesService.save(examenesDTO);
    }

    @GetMapping("/get")
    public List<ExamenesDTO> get() {
        return examenesService.getAll();
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody ExamenesDTO examenesDTO) {
        Optional<ExamenesDTO> examenOptional = examenesService.findById(examenesDTO.getId());
        if (examenOptional.isPresent()) {
            examenesService.save(examenesDTO);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
