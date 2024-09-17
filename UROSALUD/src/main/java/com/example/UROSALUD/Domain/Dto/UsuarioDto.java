package com.example.UROSALUD.Domain.Dto;
import com.example.UROSALUD.Persistence.Entity.Especialidad;
import com.example.UROSALUD.Persistence.Entity.Genero;
import com.example.UROSALUD.Persistence.Entity.Role;
import com.example.UROSALUD.Persistence.Entity.TiposIdentificacion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDto {
    private  long id;
    private String password;
    private String name;
    private String lastName;
    private String email;
    private String direccion;
    private String identificationNumber;
    private BigInteger number;
    private String stateUser;
    private Role role;
    private Genero genero;
    private Especialidad especialidad;
    private TiposIdentificacion tiposIdentificacion;
}
