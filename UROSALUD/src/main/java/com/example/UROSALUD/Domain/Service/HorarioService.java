package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Persistence.Entity.Horario;
import com.example.UROSALUD.Persistence.Entity.User;
import com.example.UROSALUD.Persistence.Repository.HorarioRepository;
import com.example.UROSALUD.Persistence.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
public class HorarioService {

    @Autowired
    private HorarioRepository horarioRepository;

    @Autowired
    private UsuarioRepository doctorRepository; // Asegúrate de tener un repositorio para el doctor

    public void generarHorariosParaDoctor(Long doctorId) {
        LocalTime startTime = LocalTime.of(8, 0);
        LocalTime endTime = LocalTime.of(17, 0);

        // Buscar el doctor completo usando su ID
        User doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor no encontrado"));

        while (startTime.isBefore(endTime)) {
            if (!startTime.equals(LocalTime.of(12, 0))) { // Excluir de 12:00 a 13:00
                Horario horario = new Horario(startTime, doctor, 4); // Pasa el objeto doctor en vez de doctorId
                horarioRepository.save(horario);
            }
            startTime = startTime.plusHours(1); // Intervalos de 1 hora
        }
    }
}

