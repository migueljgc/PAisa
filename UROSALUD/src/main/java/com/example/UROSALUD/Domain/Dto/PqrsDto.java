package com.example.UROSALUD.Domain.Dto;

import com.example.UROSALUD.Persistence.Entity.TiposSolicitud;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data


public class PqrsDto {
    private long id;

    private String descripcion;

    private Date fechaHora;

    private TiposSolicitud tiposSolicitud;
}
