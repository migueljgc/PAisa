package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Dto.TiposCitasDTO;
import com.example.UROSALUD.Domain.Service.TiposCitasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/TiposCitas")
public class TiposCitasController {
    @Autowired
    private TiposCitasService tiposCitasService;

    @PostMapping("/save")
    public TiposCitasDTO save(@RequestBody TiposCitasDTO tiposCitasDTO){
        return tiposCitasService.save(tiposCitasDTO);
    }

    @GetMapping("/get")
    public List<TiposCitasDTO> get() {
        return tiposCitasService.getAll();
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody TiposCitasDTO tiposCitasDTO) {
        Optional<TiposCitasDTO> tiposCitasOptional = tiposCitasService.findById(tiposCitasDTO.getId());
        if (tiposCitasOptional.isPresent()) {
            tiposCitasService.save(tiposCitasDTO);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
