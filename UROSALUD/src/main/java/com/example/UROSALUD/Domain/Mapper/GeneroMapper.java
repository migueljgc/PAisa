package com.example.UROSALUD.Domain.Mapper;

import com.example.UROSALUD.Domain.Dto.GeneroDTO;
import com.example.UROSALUD.Persistence.Entity.Genero;

public class GeneroMapper {
    public static Genero toEntity(GeneroDTO generoDTO) {
        Genero genero = new Genero();
        genero.setId(generoDTO.getId());
        genero.setDescricion(generoDTO.getDescricion());
        return genero;
    }

    public static GeneroDTO toDto(Genero genero) {
        GeneroDTO generoDTO = new GeneroDTO();
        generoDTO.setId(genero.getId());
        generoDTO.setDescricion(genero.getDescricion());
        return generoDTO;
    }
}
