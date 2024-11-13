package com.example.UROSALUD.Domain.Mapper;


import com.example.UROSALUD.Domain.Dto.UsuarioDto;
import com.example.UROSALUD.Persistence.Entity.User;

public class UsuarioMapper {

    public static User toEntity(UsuarioDto userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setDireccion(userDTO.getDireccion());
        user.setGenero(userDTO.getGenero());
        user.setStateUser(userDTO.getStateUser());
        user.setName(userDTO.getName());
        user.setLastName(userDTO.getLastName());
        user.setRole(userDTO.getRole());
        user.setEspecialidad(userDTO.getEspecialidad());
        user.setImg(userDTO.getImg());
        return user;
    }

    public static UsuarioDto toDto(User user) {
        UsuarioDto userDTO = new UsuarioDto();
        userDTO.setId(user.getId());
        userDTO.setDireccion(user.getDireccion());
        userDTO.setGenero(user.getGenero());
        userDTO.setStateUser(user.getStateUser());
        userDTO.setName(user.getName());
        userDTO.setLastName(user.getLastName());
        userDTO.setRole(user.getRole());
        userDTO.setEspecialidad(user.getEspecialidad());
        userDTO.setImg(user.getImg());
        return userDTO;
    }
}
