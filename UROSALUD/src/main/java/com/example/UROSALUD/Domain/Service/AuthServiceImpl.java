package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Controller.models.AuthResponse;
import com.example.UROSALUD.Controller.models.AuthenticationRequest;
import com.example.UROSALUD.Controller.models.RegisterRequest;
import com.example.UROSALUD.Persistence.Entity.Role;
import com.example.UROSALUD.Persistence.Entity.User;
import com.example.UROSALUD.Persistence.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final EmailServiceImpl emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    private HorarioService horarioService;


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
                .email(request.getEmail())
                .especialidad(request.getEspecialidad())
                .identificacion(request.getIdentificacion())
                .tiposIdentificacion(request.getTiposIdentificacion())
                .number(request.getNumber())
                .especialidad(request.getEspecialidad())
                .build();
        userRepository.save(user);
        // Generar los horarios si el rol es doctor


        if (user.getRole() == Role.DOCTOR) {
            horarioService.generarHorariosParaDoctor(user.getId());
        }



        var jwtToken = jwtService.genereteToken((UserDetails) user);
        String activationLink = "http://localhost:5173/activate/"+jwtToken;
        String mensajeHtml = String.format(
                "<h1>¡Querido %s %s!</h1>" +
                        "<p>Te has registrado con éxito, activa tu cuenta para ingresar a la página" +
                        "<br /><br />" +
                        "<a href=\"%s\">Activar</a>" +
                        "<br /><br />" +
                        "Este enlace te llevará a una página donde podrás confirmar tu identidad. Una vez completado este paso, tu verificación estará finalizada y podrás acceder a todos los beneficios de nuestra plataforma de manera segura." +
                        "<br /><br />" +
                        "Coordialmente<br /><br />" +
                        "Equipo Uros.<br /><br />",
                user.getName(), user.getLastName(), activationLink
        );

        emailService.sendEmails(
                new String[]{user.getEmail()},
                "Confirma tu correo",
                mensajeHtml
        );

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
                .email(request.getEmail())
                .especialidad(request.getEspecialidad())
                .identificacion(request.getIdentificacion())
                .tiposIdentificacion(request.getTiposIdentificacion())
                .number(request.getNumber())
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.genereteToken((UserDetails) user);
        String activationLink = "http://localhost:5173/activate/"+jwtToken;
        String mensajeHtml = String.format(
                "<h1>¡Querido %s %s!</h1>" +
                        "<p>Te has registrado con éxito, activa tu cuenta para ingresar a la página" +
                        "<br /><br />" +
                        "<a href=\"%s\">Activar</a>" +
                        "<br /><br />" +
                        "Este enlace te llevará a una página donde podrás confirmar tu identidad. Una vez completado este paso, tu verificación estará finalizada y podrás acceder a todos los beneficios de nuestra plataforma de manera segura." +
                        "<br /><br />" +
                        "Coordialmente<br /><br />" +
                        "Equipo Uros.<br /><br />",
                user.getName(), user.getLastName(), activationLink
        );

        emailService.sendEmails(
                new String[]{user.getEmail()},
                "Confirma tu correo",
                mensajeHtml
        );
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

