package com.example.UROSALUD.Persistence.Entity;

import jakarta.annotation.Generated;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Pqrs")
public class Pqrs {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Column(name = "Descripcion")
    private String descripcion;

    @Column(name = "Fecha y Hora")
    private Date fechaHora;

    @JoinColumn(name = "Tipo Solicitud")
    @ManyToOne
    private TiposSolicitud tiposSolicitud;

}
