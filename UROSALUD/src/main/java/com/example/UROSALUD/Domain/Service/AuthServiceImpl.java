package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Controller.models.AuthResponse;
import com.example.UROSALUD.Controller.models.AuthenticationRequest;
import com.example.UROSALUD.Controller.models.RegisterRequest;
import com.example.UROSALUD.Persistence.Entity.Role;
import com.example.UROSALUD.Persistence.Entity.User;
import com.example.UROSALUD.Persistence.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UsuarioRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    @Override
    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .lastName(request.getLastName())
                .stateUser("INACTIVO")
                .direccion(request.getDireccion())
                .genero(request.getGenero())
                .number(request.getNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .especialidad(request.getEspecialidad())
                .identificacion(request.getIdentificacion())
                .tiposIdentificacion(request.getTiposIdentificacion())
                .number(request.getNumber())
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.genereteToken((UserDetails) user);

        return AuthResponse.builder()
                .token(jwtToken).build();
    }

    @Override
    public AuthResponse registerUser(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .lastName(request.getLastName())
                .stateUser("INACTIVO")
                .direccion(request.getDireccion())
                .genero(request.getGenero())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .especialidad(request.getEspecialidad())
                .identificacion(request.getIdentificacion())
                .tiposIdentificacion(request.getTiposIdentificacion())
                .number(request.getNumber())
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.genereteToken((UserDetails) user);
        return AuthResponse.builder()
                .token(jwtToken).build();
    }

    @Override
    public AuthResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getIdentificacion(),
                            request.getPassword()
                    )
            );
            UserDetails user = userRepository.findUserByIdentificacion(request.getIdentificacion()).orElseThrow();
            String jwtToken = jwtService.genereteToken(user);
            List<String> roles = user.getAuthorities().stream()
                    .map(authority -> authority.getAuthority())
                    .collect(Collectors.toList());

            return AuthResponse.builder()
                    .token(jwtToken)
                    .authorities(roles)
                    .build();
        } catch (UsernameNotFoundException e) {
            // Si el usuario no fue encontrado, devuelve un mensaje apropiado o lanza una excepción
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario no encontrado");
        } catch (BadCredentialsException e) {
            // Si las credenciales son incorrectas, devuelve un mensaje apropiado
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas");
        } catch (Exception e) {
            // Manejo genérico de errores
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor", e);
        }
    }
    @Override
    public User getCurrentUser(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }



}

