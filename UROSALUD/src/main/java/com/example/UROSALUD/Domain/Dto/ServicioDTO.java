package com.example.UROSALUD.Domain.Dto;

import com.example.UROSALUD.Persistence.Entity.Especialidad;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ServicioDTO {

    private  long id;

    private String nombre;

    private String descripcion;

    private byte[] img;
    private Especialidad especialidad;
}
