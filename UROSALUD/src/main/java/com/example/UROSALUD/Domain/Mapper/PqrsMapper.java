package com.example.UROSALUD.Domain.Mapper;

import com.example.UROSALUD.Domain.Dto.PqrsDto;
import com.example.UROSALUD.Persistence.Entity.Pqrs;
import org.springframework.beans.factory.annotation.Autowired;

public class PqrsMapper {

    public static Pqrs toEntity(PqrsDto pqrsDto) {
        Pqrs pqrs = new Pqrs();
        pqrs.setId(pqrsDto.getId());
        pqrs.setDescripcion(pqrsDto.getDescripcion());
        pqrs.setFechaHora(pqrsDto.getFechaHora());
        pqrs.setTiposSolicitud(pqrsDto.getTiposSolicitud());
        return pqrs;
    }

    public static PqrsDto toDto(Pqrs pqrs) {
        PqrsDto pqrsDto = new PqrsDto();
        pqrsDto.setId(pqrs.getId());
        pqrsDto.setDescripcion(pqrs.getDescripcion());
        pqrsDto.setFechaHora(pqrs.getFechaHora());
        pqrsDto.setTiposSolicitud(pqrs.getTiposSolicitud());
        return pqrsDto;
    }
}
