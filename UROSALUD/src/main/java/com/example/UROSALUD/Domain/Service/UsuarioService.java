package com.example.UROSALUD.Domain.Service;


import com.example.UROSALUD.Domain.Dto.UsuarioDto;
import com.example.UROSALUD.Domain.Mapper.UsuarioMapper;
import com.example.UROSALUD.Persistence.Entity.User;
import com.example.UROSALUD.Persistence.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    public List<UsuarioDto> getAll() {
        return usuarioRepository.findAll().stream().map(UsuarioMapper::toDto).collect(Collectors.toList());
    }

    public List<User> get() {
        return usuarioRepository.findAll();
    }

    public Optional<UsuarioDto> findById(Long id) {
        return usuarioRepository.findById(id).map(UsuarioMapper::toDto);
    }

    public UsuarioDto save(UsuarioDto usuarioDto) {
        usuarioRepository.save(UsuarioMapper.toEntity(usuarioDto));
        return usuarioDto;
    }
    public User findByEmail(String email) {
        return usuarioRepository.findByEmail(email) ;
    }

    public void resetPassword(String email, String newPassword) {
        User user = usuarioRepository.findByEmail(email);
        if (user != null){
            user.setPassword(passwordEncoder.encode(newPassword));
            usuarioRepository.save(user);
        }
        else{
            System.out.println("Email no encontrado");
        }
    }
}
