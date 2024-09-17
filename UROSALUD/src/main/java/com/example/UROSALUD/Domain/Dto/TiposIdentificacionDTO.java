package com.example.UROSALUD.Domain.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class TiposIdentificacionDTO {

    private  long id;

    private String descripcion;
}
