package com.example.UROSALUD.Controller;


import com.example.UROSALUD.Controller.models.AuthResponse;
import com.example.UROSALUD.Controller.models.AuthenticationRequest;
import com.example.UROSALUD.Controller.models.RegisterRequest;
import com.example.UROSALUD.Domain.Service.AuthService;
import com.example.UROSALUD.Domain.Service.JwtService;
import com.example.UROSALUD.Domain.Service.UsuarioService;
import com.example.UROSALUD.Persistence.Entity.User;
import com.example.UROSALUD.Persistence.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    UsuarioRepository userRepository;

    @Autowired
    private UsuarioService userService;

    @Autowired
    private JwtService jwtService;


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> Register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/registerUser")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.registerUser(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/editar")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(authService.getCurrentUser(authentication));
    }
    @GetMapping("/buscar")
    public ResponseEntity<User> getBuscarUser(Authentication authentication) {
        return ResponseEntity.ok(authService.getCurrentUser(authentication));
    }
    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        try {
            if (jwtService.validateToken(token)) {
                String username = jwtService.getUserName(token);
                userService.verifyUser(username); // Implementa la lógica para marcar al usuario como verificado
                return ResponseEntity.ok("Correo electrónico verificado correctamente.");
            } else {
                return ResponseEntity.badRequest().body("Enlace de verificación inválido o expirado.");
            }
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.internalServerError().body("error"+e);
        }

    }


}
