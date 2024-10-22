package com.example.UROSALUD.Persistence.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Citas")
public class Citas {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;

    @Column(name = "Fecha")
    private String fecha;

    @JoinColumn(name = "ID_Estado")
    @ManyToOne
    private EstadosCitas estadosCitas;

    @JoinColumn(name = "ID_Paciente")
    @ManyToOne
    private User paciente;

    @JoinColumn(name = "ID_Doctor")
    @ManyToOne
    private User doctor;

    @JoinColumn(name = "ID_TiposCitas")
    @ManyToOne
    private TiposCitas tiposCitas;

    @Column(name = "Hora ")
    private String hora;

    @Lob
    @Column(name = "Archivo_Historia_Clinica")
    private String archivoAnswerHistoria;

    @Lob
    @Column(name = "Archivo_Historia_Medica")
    private String archivoAnswerMedica;

}
