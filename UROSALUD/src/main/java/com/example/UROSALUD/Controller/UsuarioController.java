package com.example.UROSALUD.Controller;


import com.example.UROSALUD.Domain.Dto.UsuarioDto;
import com.example.UROSALUD.Domain.Service.UsuarioService;
import com.example.UROSALUD.Persistence.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Usuario/")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/save")
    public UsuarioDto save(@RequestBody UsuarioDto usuarioDto){
        return usuarioService.save(usuarioDto);
    }

    @GetMapping("/get")
    public List<User> get(){return usuarioService.get();}

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody UsuarioDto usuarioDto) {
        Optional<UsuarioDto> personTypeDTOOptional = usuarioService.findById(usuarioDto.getId());
        if(personTypeDTOOptional.isPresent()) {
            usuarioService.save(usuarioDto);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping("/perfil/update")
    public ResponseEntity<?> updateProfile(@RequestBody UsuarioDto userUpdateDTO) {
        try {
            // Llama a un servicio que procese la actualización
            System.out.println("user "+userUpdateDTO);
            usuarioService.updateUserProfile(userUpdateDTO);
            return ResponseEntity.ok("Perfil actualizado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el perfil.");
        }
    }

}
