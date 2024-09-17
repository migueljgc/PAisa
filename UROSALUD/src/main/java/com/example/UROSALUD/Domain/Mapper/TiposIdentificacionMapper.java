package com.example.UROSALUD.Domain.Mapper;

import com.example.UROSALUD.Domain.Dto.TiposIdentificacionDTO;
import com.example.UROSALUD.Persistence.Entity.TiposIdentificacion;

public class TiposIdentificacionMapper {
    public static TiposIdentificacion toEntity(TiposIdentificacionDTO tiposIdentificacionDTO){
        TiposIdentificacion tiposIdentificacion = new TiposIdentificacion();
        tiposIdentificacion.setId(tiposIdentificacionDTO.getId());
        tiposIdentificacion.setDescripcion(tiposIdentificacionDTO.getDescripcion());
        return tiposIdentificacion;
    }
    public static TiposIdentificacionDTO toDto(TiposIdentificacion tiposIdentificacion){
        TiposIdentificacionDTO tiposIdentificacionDTO = new TiposIdentificacionDTO();
        tiposIdentificacionDTO.setId(tiposIdentificacion.getId());
        tiposIdentificacionDTO.setDescripcion(tiposIdentificacion.getDescripcion());
        return tiposIdentificacionDTO;
    }
}
