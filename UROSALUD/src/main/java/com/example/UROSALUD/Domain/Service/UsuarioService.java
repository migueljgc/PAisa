package com.example.UROSALUD.Domain.Service;


import com.example.UROSALUD.Domain.Dto.UsuarioDto;
import com.example.UROSALUD.Domain.Mapper.UsuarioMapper;
import com.example.UROSALUD.Persistence.Entity.User;
import com.example.UROSALUD.Persistence.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    public void verifyUser(String username) {

        User user = usuarioRepository.findByIdentificacion(username);
        if (user != null){
            user.setStateUser("ACTIVO");
            usuarioRepository.save(user);
        }
    }

    public void updateUserProfile(UsuarioDto userUpdateDTO) {
        Optional<User> optionalUser = usuarioRepository.findById(userUpdateDTO.getId());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Asigna todos los campos de userUpdateDTO al objeto User
            user.setName(userUpdateDTO.getName());
            user.setLastName(userUpdateDTO.getLastName());
            user.setEmail(userUpdateDTO.getEmail());
            user.setDireccion(userUpdateDTO.getDireccion());
            user.setIdentificacion(userUpdateDTO.getIdentificacion());
            user.setNumber(userUpdateDTO.getNumber());
            user.setGenero(userUpdateDTO.getGenero());
            user.setTiposIdentificacion(userUpdateDTO.getTiposIdentificacion());

            System.out.println("user "+user);
            usuarioRepository.save(user);
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }

    public void updateProfileImage(MultipartFile image) throws Exception {
        // Obtener el usuario autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username;

        if (authentication.getPrincipal() instanceof UserDetails) {
            username = ((UserDetails) authentication.getPrincipal()).getUsername();
        } else {
            username = authentication.getPrincipal().toString();
        }

        // Buscar al usuario en la base de datos
        Optional<User> optionalUser = usuarioRepository.findUserByIdentificacion(username);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setImg(image.getBytes()); // Actualizar la imagen
            usuarioRepository.save(user);
        } else {
            throw new Exception("Usuario no encontrado");
        }
    }
}
