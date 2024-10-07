package com.example.UROSALUD.Persistence.Entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Tipos_Solicitud ")
public class TiposSolicitud {

    @Column(name = "ID_Tipo_Solicitud")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Tipo_Solicitud")
    private String description;
}
