package com.example.UROSALUD.Domain.Mapper;

import com.example.UROSALUD.Domain.Dto.ExamenesDTO;
import com.example.UROSALUD.Persistence.Entity.Examenes;

public class ExamenesMapper {
    public static Examenes toEntity(ExamenesDTO examenesDTO) {
        Examenes examenes = new Examenes();
        examenes.setId(examenesDTO.getId());
        examenes.setTiposExamen(examenesDTO.getTiposExamen());
        examenes.setFecha(examenesDTO.getFecha());
        examenes.setUserPaciente(examenesDTO.getUserPaciente());
        examenes.setUserDoctor(examenesDTO.getUserDoctor());
        examenes.setDescripcion(examenesDTO.getDescripcion());
        return examenes;
    }

    public static ExamenesDTO toDto(Examenes examenes) {
        ExamenesDTO examenesDTO = new ExamenesDTO();
        examenesDTO.setId(examenes.getId());
        examenesDTO.setTiposExamen(examenes.getTiposExamen());
        examenesDTO.setFecha(examenes.getFecha());
        examenesDTO.setUserPaciente(examenes.getUserPaciente());
        examenesDTO.setUserDoctor(examenes.getUserDoctor());
        examenesDTO.setDescripcion(examenes.getDescripcion());
        return examenesDTO;
    }
}
