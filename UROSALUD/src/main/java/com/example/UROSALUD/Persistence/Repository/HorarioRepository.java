package com.example.UROSALUD.Persistence.Repository;

import com.example.UROSALUD.Persistence.Entity.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, Long> {
    Optional<Horario> findByDoctorIdAndHora(Long doctorId, LocalTime hora);

    List<Horario> findAllByDoctorIdAndHoraBetween(Long doctorId, LocalTime start, LocalTime end);
}

