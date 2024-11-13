package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Domain.Dto.CitasDTO;
import com.example.UROSALUD.Domain.Mapper.CitasMapper;
import com.example.UROSALUD.Persistence.Entity.Citas;
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
    public CitasDTO saveHistoria(CitasDTO citasDTO) {
        Optional<Citas> existingCitasOptional = citasRepository.findById(citasDTO.getId());
        if (existingCitasOptional.isPresent()) {
            Citas existingCitas = existingCitasOptional.get();
            // Actualizar los campos relevantes de la solicitud existente con los valores de requestDTO

            existingCitas.setArchivoAnswerHistoria(citasDTO.getArchivoAnswerHistoria());
            // Actualizar otros campos si es necesario
            // Guardar los cambios en la base de datos
            Citas savedCitas = citasRepository.save(existingCitas);

            // Devolver el DTO con los datos actualizados
            return CitasMapper.toDto(savedCitas);

        } return null;
    }
    public CitasDTO saveExamen(CitasDTO citasDTO) {
        Optional<Citas> existingCitasOptional = citasRepository.findById(citasDTO.getId());
        if (existingCitasOptional.isPresent()) {
            Citas existingCitas = existingCitasOptional.get();
            // Actualizar los campos relevantes de la solicitud existente con los valores de requestDTO

            existingCitas.setArchivoAnswerMedica(citasDTO.getArchivoAnswerMedica());
            // Actualizar otros campos si es necesario
            Citas savedCitas = citasRepository.save(existingCitas);

            // Devolver el DTO con los datos actualizados
            return CitasMapper.toDto(savedCitas);
        } return null;
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
