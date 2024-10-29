package com.example.UROSALUD.Domain.Mapper;

import com.example.UROSALUD.Domain.Dto.ServicioDTO;
import com.example.UROSALUD.Persistence.Entity.Servicio;

public class ServicioMapper {
    public static Servicio toEntity(ServicioDTO servicioDTO) {
        Servicio servicio = new Servicio();
        servicio.setId(servicioDTO.getId());
        servicio.setNombre(servicioDTO.getNombre());
        servicio.setDescripcion(servicioDTO.getDescripcion());
        servicio.setImg(servicioDTO.getImg());
        servicio.setEspecialidad(servicioDTO.getEspecialidad());
        return servicio;
    }

    public static ServicioDTO toDto(Servicio servicio) {
        ServicioDTO servicioDTO = new ServicioDTO();
        servicioDTO.setId(servicio.getId());
        servicioDTO.setNombre(servicio.getNombre());
        servicioDTO.setDescripcion(servicio.getDescripcion());
        servicioDTO.setImg(servicio.getImg());
        servicioDTO.setEspecialidad(servicio.getEspecialidad());
        return servicioDTO;
    }
}
