package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Dto.TiposExamenDTO;
import com.example.UROSALUD.Domain.Service.TiposExamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/TiposExamen/")
public class TiposExamenController {
    @Autowired
    private TiposExamenService tiposExamenService;

    @PostMapping("/save")
    public TiposExamenDTO save(@RequestBody TiposExamenDTO tiposExamenDTO){
        return tiposExamenService.save(tiposExamenDTO);
    }

    @GetMapping("/get")
    public List<TiposExamenDTO> get() {
        return tiposExamenService.getAll();
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody TiposExamenDTO tiposExamenDTO) {
        Optional<TiposExamenDTO> tiposExamenOptional = tiposExamenService.findById(tiposExamenDTO.getId());
        if (tiposExamenOptional.isPresent()) {
            tiposExamenService.save(tiposExamenDTO);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
