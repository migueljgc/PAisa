package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Service.EmailServiceImpl;
import com.example.UROSALUD.Domain.Service.JwtService;
import com.example.UROSALUD.Domain.Service.UsuarioService;
import com.example.UROSALUD.Persistence.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/forgot-password")
public class ForgotPasswordController {

    @Autowired
    private UsuarioService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private EmailServiceImpl emailService;


    @PostMapping("/email")
    public ResponseEntity<String> requestPasswordReset(@RequestBody Map<String, String> email) {
        System.out.println(email.get("email"));
        try {

        String Email = email.get("email");
        User user = userService.findByEmail(Email);
        System.out.println();
        if (user == null) {
            return ResponseEntity.badRequest().body("No se encontró un usuario con ese correo electrónico.");
        }

        // Generar token JWT para restablecer la contraseña
        String token = jwtService.genereteTokenEmail(user.getEmail());

        // Construir el enlace para restablecer la contraseña
        String resetLink = "http://localhost:5173/reset-password/" + token;

        // Enviar correo electrónico con el enlace de restablecimiento
        String message = String.format(
                "<h1>¡Querido usuario! <h1/>" +
                        "<p>Le confirmamos que hemos recibido su solicitud de restablecimiento de contraseña. Puede dirigirse al siguiente enlace y establecer una nueva contraseña" +
                        "<br /><br />" +
                        "<a href=\"%s\">Restablecer Contraseña</a>"+
                "Este correo fue enviado automáticamente, agradecemos no responder este mensaje." +
                        "<br /><br />" +
                        "Gracias por su atención" +
                        "<br /><br />" +
                        "Coordialmente<br /><br />" +
                        "Equipo Uros.<br /><br />"
                ,resetLink );
        emailService.sendEmails(
                new String[]{Email},
                "Recuperación de contraseña",
                message);
        }catch (Exception e){
            System.out.println(e);
        }
        return ResponseEntity.ok("Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.");
    }

    @PostMapping("/reset/{token}")
    public ResponseEntity<String> resetPassword(@PathVariable String token, @RequestBody Map<String, String> payload) {
        String newPassword=payload.get("newPassword");
        System.out.println(token);
        if (jwtService.validateTokenForPasswordReset(token)) {
            String email = jwtService.getUserName(token);
            userService.resetPassword(email, newPassword);
            String message = String.format(
            "<h1>¡Querido usuario! <h1/>" +
                    "<p>Tú contraseña ha sido restablecida con éxito." +
                    "<br /><br />" +
                    "Coordialmente<br /><br />" +
                    "Equipo Uros.<br /><br />"
                    );
            emailService.sendEmails(
                    new String[]{email},
                    "Restablecimiento exitoso",
                    message);
            return ResponseEntity.ok("Contraseña restablecida exitosamente.");
        } else {
            return ResponseEntity.badRequest().body("El enlace de restablecimiento de contraseña es inválido o ha expirado.");
        }
    }
}