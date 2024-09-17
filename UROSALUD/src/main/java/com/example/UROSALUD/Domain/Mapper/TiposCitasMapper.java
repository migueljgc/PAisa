package com.example.UROSALUD.Domain.Mapper;

import com.example.UROSALUD.Domain.Dto.TiposCitasDTO;
import com.example.UROSALUD.Persistence.Entity.TiposCitas;

public class TiposCitasMapper {
    public static TiposCitas toEntity(TiposCitasDTO tiposCitasDTO) {
        TiposCitas tiposCitas = new TiposCitas();
        tiposCitas.setId(tiposCitasDTO.getId());
        tiposCitas.setDescripcion(tiposCitasDTO.getDescripcion());
        return tiposCitas;
    }

    public static TiposCitasDTO toDto(TiposCitas tiposCitas) {
        TiposCitasDTO tiposCitasDTO = new TiposCitasDTO();
        tiposCitasDTO.setId(tiposCitas.getId());
        tiposCitasDTO.setDescripcion(tiposCitas.getDescripcion());
        return tiposCitasDTO;
    }
}
