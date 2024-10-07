package com.example.UROSALUD.Persistence.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Entity
@Table(name = "Horarios")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Horario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalTime hora;
    private int maxCitas = 4;
    private int citasDisponibles;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private User doctor;

    public Horario(LocalTime hora, User doctor) {
        this.hora = hora;
        this.doctor = doctor;
        this.citasDisponibles = maxCitas;  // Al crear un horario, tiene 4 citas disponibles
    }
    public Horario(LocalTime horaInicio, User doctor, int citasDisponibles) {
        this.hora = horaInicio;
        this.doctor = doctor;
        this.citasDisponibles = citasDisponibles;
    }

    public boolean reservarCita() {
        if (citasDisponibles > 0) {
            citasDisponibles--;
            return true;
        }
        return false;
    }


}

