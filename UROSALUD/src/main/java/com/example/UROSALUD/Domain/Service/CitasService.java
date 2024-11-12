package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Domain.Dto.CitasDTO;
import com.example.UROSALUD.Domain.Mapper.CitasMapper;
import com.example.UROSALUD.Persistence.Entity.Horario;
import com.example.UROSALUD.Persistence.Repository.CitasRepository;
import com.example.UROSALUD.Persistence.Repository.HorarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CitasService {
    @Autowired
    private CitasRepository citasRepository;

    @Autowired
    private HorarioRepository horarioRepository;


    public List<CitasDTO> getAll() {
        return citasRepository.findAll().stream().map(CitasMapper::toDto).collect(Collectors.toList());
    }

    public Optional<CitasDTO> findById(Long id) {
        return citasRepository.findById(id).map(CitasMapper::toDto);
    }

    public CitasDTO save(CitasDTO citasDTO) {
        citasRepository.save(CitasMapper.toEntity(citasDTO));
        return citasDTO;
    }

    public boolean reservarCita(Long doctorId, LocalTime hora) {
        Optional<Horario> horario = horarioRepository.findByDoctorIdAndHora(doctorId, hora);
        if (horario.isPresent() && horario.get().reservarCita()) {
            horarioRepository.save(horario.get());
            return true;
        }
        return false;
    }

    public List<Horario> obtenerHorariosDisponibles(Long doctorId) {
        return horarioRepository.findAllByDoctorIdAndHoraBetween(doctorId, LocalTime.of(8, 0), LocalTime.of(17, 0))
                .stream()
                .filter(horario -> !horario.getHora().equals(LocalTime.of(12, 0)))  // Excluir horario de descanso
                .collect(Collectors.toList());
    }
    public CitasDTO update(CitasDTO citasDTO) {
        citasRepository.save(CitasMapper.toEntity(citasDTO));
        return citasDTO;
    }
}
