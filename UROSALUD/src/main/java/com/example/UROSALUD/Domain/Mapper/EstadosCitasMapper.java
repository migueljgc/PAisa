package com.example.UROSALUD.Domain.Mapper;

import com.example.UROSALUD.Domain.Dto.EstadosCitasDTO;
import com.example.UROSALUD.Persistence.Entity.EstadosCitas;

public class EstadosCitasMapper {
    public static EstadosCitas toEntity(EstadosCitasDTO estadosCitasDTO) {
        EstadosCitas estadosCitas = new EstadosCitas();
        estadosCitas.setId(estadosCitasDTO.getId());
        estadosCitas.setDescripcion(estadosCitasDTO.getDescripcion());
        return estadosCitas;
    }

    public static EstadosCitasDTO toDto(EstadosCitas estadosCitas) {
        EstadosCitasDTO estadosCitasDTO = new EstadosCitasDTO();
        estadosCitasDTO.setId(estadosCitas.getId());
        estadosCitasDTO.setDescripcion(estadosCitas.getDescripcion());
        return estadosCitasDTO;
    }
}
