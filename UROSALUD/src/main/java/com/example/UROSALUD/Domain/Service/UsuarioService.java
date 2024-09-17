package com.example.UROSALUD.Domain.Service;


import com.example.UROSALUD.Domain.Dto.UsuarioDto;
import com.example.UROSALUD.Domain.Mapper.UsuarioMapper;
import com.example.UROSALUD.Persistence.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;


    public List<UsuarioDto> getAll() {
        return usuarioRepository.findAll().stream().map(UsuarioMapper::toDto).collect(Collectors.toList());
    }

    public Optional<UsuarioDto> findById(Long id) {
        return usuarioRepository.findById(id).map(UsuarioMapper::toDto);
    }

    public UsuarioDto save(UsuarioDto usuarioDto) {
        usuarioRepository.save(UsuarioMapper.toEntity(usuarioDto));
        return usuarioDto;
    }
}
