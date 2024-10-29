package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Persistence.Entity.Especialidad;
import com.example.UROSALUD.Persistence.Repository.EspecialidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EspecialidadService {
    @Autowired
    private EspecialidadRepository especialidadRepositoryRepository;

    public List<Especialidad> getAll() {
        return especialidadRepositoryRepository.findAll();
    }

    public Optional<Especialidad> findById(Long id) {
        return especialidadRepositoryRepository.findById(id);
    }

    public Especialidad save(Especialidad especialidad) {
        especialidadRepositoryRepository.save(especialidad);
        return especialidad;
    }
}
