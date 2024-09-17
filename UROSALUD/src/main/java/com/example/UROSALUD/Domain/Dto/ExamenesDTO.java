package com.example.UROSALUD.Domain.Dto;

import com.example.UROSALUD.Persistence.Entity.TiposExamen;
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

public class ExamenesDTO {

    private  long id;

    private TiposExamen tiposExamen;

    private Date fecha;

    private User userPaciente;

    private User userDoctor;

    private String descripcion;




}
