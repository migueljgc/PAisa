package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Dto.TiposSolicitudDTO;
import com.example.UROSALUD.Domain.Service.TiposSolicitudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping ("/api/tipoSolicitud")
public class TiposSolicitudController {
    @Autowired
    private TiposSolicitudService tiposSolicitudService;

    @PostMapping("/save")
    public TiposSolicitudDTO save(@RequestBody TiposSolicitudDTO tiposSolicitudDTO){
        return tiposSolicitudService.save(tiposSolicitudDTO);
    }

    @GetMapping("/get")
    public List<TiposSolicitudDTO> get(){return tiposSolicitudService.getAll();}

}
