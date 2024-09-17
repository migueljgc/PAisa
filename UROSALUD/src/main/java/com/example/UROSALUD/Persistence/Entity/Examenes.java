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
@Table(name = "Examenes")
public class Examenes {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;

    @JoinColumn(name = "ID_TipoExamen")
    @ManyToOne
    private TiposExamen tiposExamen;

    @Column(name = "Fecha")
    private Date fecha;

    @JoinColumn(name = "ID_Paciente")
    @ManyToOne
    private User userPaciente;

    @JoinColumn(name = "ID_Doctor")
    @ManyToOne
    private User userDoctor;

    @Column(name = "Descripcion")
    private String descripcion;




}
