package com.example.UROSALUD.Domain.Mapper;

import com.example.UROSALUD.Domain.Dto.CitasDTO;
import com.example.UROSALUD.Persistence.Entity.Citas;

public class CitasMapper {
    public static Citas toEntity(CitasDTO citasDTO) {
        Citas citas = new Citas();
        citas.setId(citasDTO.getId());
        citas.setFecha(citasDTO.getFecha());
        citas.setEstadosCitas(citasDTO.getEstadosCitas());
        citas.setPaciente(citasDTO.getPaciente());
        citas.setDoctor(citasDTO.getDoctor());
        citas.setTiposCitas(citasDTO.getTiposCitas());
        citas.setHora(citasDTO.getHora());
        citas.setArchivoAnswerMedica(citasDTO.getArchivoAnswerMedica());
        citas.setArchivoAnswerHistoria(citasDTO.getArchivoAnswerHistoria());
        return citas;
    }

    public static CitasDTO toDto(Citas citas) {
        CitasDTO citasDTO = new CitasDTO();
        citasDTO.setId(citas.getId());
        citasDTO.setFecha(citas.getFecha());
        citasDTO.setEstadosCitas(citas.getEstadosCitas());
        citasDTO.setPaciente(citas.getPaciente());
        citasDTO.setDoctor(citas.getDoctor());
        citasDTO.setTiposCitas(citas.getTiposCitas());
        citasDTO.setHora(citas.getHora());
        citasDTO.setArchivoAnswerMedica(citas.getArchivoAnswerMedica());
        citasDTO.setArchivoAnswerHistoria(citas.getArchivoAnswerHistoria());
        return citasDTO;
    }
}
