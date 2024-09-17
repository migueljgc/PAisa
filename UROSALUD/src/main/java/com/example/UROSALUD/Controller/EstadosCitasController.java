package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Dto.EstadosCitasDTO;
import com.example.UROSALUD.Domain.Service.EstadosCitasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/EstadosCitas/")
public class EstadosCitasController {
    @Autowired
    private EstadosCitasService estadosCitasService;

    @PostMapping("/save")
    public EstadosCitasDTO save(@RequestBody EstadosCitasDTO estadosCitasDTO){
        return estadosCitasService.save(estadosCitasDTO);
    }

    @GetMapping("/get")
    public List<EstadosCitasDTO> get() {
        return estadosCitasService.getAll();
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody EstadosCitasDTO estadosCitasDTO) {
        Optional<EstadosCitasDTO> estadoCitaOptional = estadosCitasService.findById(estadosCitasDTO.getId());
        if (estadoCitaOptional.isPresent()) {
            estadosCitasService.save(estadosCitasDTO);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
