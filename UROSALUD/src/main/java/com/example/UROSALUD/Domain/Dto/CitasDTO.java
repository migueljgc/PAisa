package com.example.UROSALUD.Domain.Dto;

import com.example.UROSALUD.Persistence.Entity.EstadosCitas;
import com.example.UROSALUD.Persistence.Entity.TiposCitas;
import com.example.UROSALUD.Persistence.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class CitasDTO {

    private  long id;

    private String fecha;

    private EstadosCitas estadosCitas;

    private User paciente;

    private User doctor;

    private TiposCitas tiposCitas;

    private String hora;



}
