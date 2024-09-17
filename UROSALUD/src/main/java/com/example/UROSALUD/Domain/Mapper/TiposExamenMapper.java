package com.example.UROSALUD.Domain.Mapper;

import com.example.UROSALUD.Domain.Dto.TiposExamenDTO;
import com.example.UROSALUD.Domain.Dto.TiposIdentificacionDTO;
import com.example.UROSALUD.Persistence.Entity.TiposExamen;
import com.example.UROSALUD.Persistence.Entity.TiposIdentificacion;

public class TiposExamenMapper {
    public static TiposExamen toEntity(TiposExamenDTO tiposExamenDTO){
        TiposExamen tiposExamen = new TiposExamen();
        tiposExamen.setId(tiposExamenDTO.getId());
        tiposExamen.setDescripcion(tiposExamenDTO.getDescripcion());
        return tiposExamen;
    }
    public static TiposExamenDTO toDto(TiposExamen tiposExamen){
        TiposExamenDTO tiposExamenDTO = new TiposExamenDTO();
        tiposExamenDTO.setId(tiposExamen.getId());
        tiposExamenDTO.setDescripcion(tiposExamen.getDescripcion());
        return tiposExamenDTO;
    }
}
