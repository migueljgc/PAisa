package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Dto.TiposIdentificacionDTO;
import com.example.UROSALUD.Domain.Service.TiposIdentificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/TiposIdentificacion/")
public class TiposIdentificacionController {
    @Autowired
    private TiposIdentificacionService tiposIdentificacionService;

    @PostMapping("/save")
    public TiposIdentificacionDTO save(@RequestBody TiposIdentificacionDTO tiposIdentificacionDTO){
        return tiposIdentificacionService.save(tiposIdentificacionDTO);
    }

    @GetMapping("/get")
    public List<TiposIdentificacionDTO> get(){
        return tiposIdentificacionService.getAll();
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody TiposIdentificacionDTO tiposIdentificacionDTO) {
        Optional<TiposIdentificacionDTO> tipoIdentificacionOptional = tiposIdentificacionService.findById(tiposIdentificacionDTO.getId());
        if(tipoIdentificacionOptional.isPresent()) {
            tiposIdentificacionService.save(tiposIdentificacionDTO);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
