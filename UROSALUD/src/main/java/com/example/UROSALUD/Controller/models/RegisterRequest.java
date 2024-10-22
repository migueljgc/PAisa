package com.example.UROSALUD.Controller.models;



import com.example.UROSALUD.Persistence.Entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String password;
    private String name;
    private String lastName;
    private String email;
    private String direccion;
    private String identificacion;
    private BigInteger number;
    private String stateUser;
    private Role role;
    private Genero genero;
    private Especialidad especialidad;
    private TiposIdentificacion tiposIdentificacion;

}
