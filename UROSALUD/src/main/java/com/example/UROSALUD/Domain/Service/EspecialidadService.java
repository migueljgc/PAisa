package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Domain.Dto.EspecialidadDTO;
import com.example.UROSALUD.Domain.Mapper.EspecialidadMapper;
import com.example.UROSALUD.Persistence.Repository.EspecialidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EspecialidadService {
    @Autowired
    private EspecialidadRepository especialidadRepository;

    public List<EspecialidadDTO> getAll() {
        return especialidadRepository.findAll().stream().map(EspecialidadMapper::toDto).collect(Collectors.toList());
    }

    public Optional<EspecialidadDTO> findById(Long id) {
        return especialidadRepository.findById(id).map(EspecialidadMapper::toDto);
    }

    public EspecialidadDTO save(EspecialidadDTO especialidadDTO) {
        especialidadRepository.save(EspecialidadMapper.toEntity(especialidadDTO));
        return especialidadDTO;
    }
}
