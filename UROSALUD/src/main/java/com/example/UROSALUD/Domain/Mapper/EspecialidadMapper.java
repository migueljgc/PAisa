package com.example.UROSALUD.Domain.Mapper;

import com.example.UROSALUD.Domain.Dto.EspecialidadDTO;
import com.example.UROSALUD.Persistence.Entity.Especialidad;

public class EspecialidadMapper {
    public static Especialidad toEntity(EspecialidadDTO especialidadDTO) {
        Especialidad especialidad = new Especialidad();
        especialidad.setId(especialidadDTO.getId());
        especialidad.setNombre(especialidadDTO.getNombre());
        especialidad.setDescripcion(especialidadDTO.getDescripcion());
        return especialidad;
    }

    public static EspecialidadDTO toDto(Especialidad especialidad) {
        EspecialidadDTO especialidadDTO = new EspecialidadDTO();
        especialidadDTO.setId(especialidad.getId());
        especialidadDTO.setNombre(especialidad.getNombre());
        especialidadDTO.setDescripcion(especialidad.getDescripcion());
        return especialidadDTO;
    }
}
