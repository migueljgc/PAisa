package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Dto.GeneroDTO;
import com.example.UROSALUD.Domain.Service.GeneroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Genero/")
public class GeneroController {
    @Autowired
    private GeneroService generoService;

    @PostMapping("/save")
    public GeneroDTO save(@RequestBody GeneroDTO generoDTO){

        return generoService.save(generoDTO);
    }

    @GetMapping("/get")
    public List<GeneroDTO> get() {
        return generoService.getAll();
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody GeneroDTO generoDTO) {
        Optional<GeneroDTO> generoOptional = generoService.findById(generoDTO.getId());
        if (generoOptional.isPresent()) {
            generoService.save(generoDTO);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
