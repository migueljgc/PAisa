package com.example.UROSALUD.Domain.Mapper;

import com.example.UROSALUD.Domain.Dto.TiposSolicitudDTO;
import com.example.UROSALUD.Persistence.Entity.TiposSolicitud;

public class TiposSolicitudMapper
{
    public static TiposSolicitud toEntinty(TiposSolicitudDTO tiposSolicitudDTO){
        TiposSolicitud tiposSolicitud = new TiposSolicitud();
        tiposSolicitud.setId(tiposSolicitudDTO.getId());
        tiposSolicitud.setDescription(tiposSolicitudDTO.getDescripcion());
        return tiposSolicitud;
    }

    public static TiposSolicitudDTO toDto(TiposSolicitud tiposSolicitud){
        TiposSolicitudDTO tiposSolicitudDTO = new TiposSolicitudDTO();
        tiposSolicitudDTO.setId(tiposSolicitud.getId());
        tiposSolicitudDTO.setDescripcion(tiposSolicitud.getDescription());
        return tiposSolicitudDTO;
    }
}
