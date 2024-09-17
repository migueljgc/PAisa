package com.example.UROSALUD.Domain.Service;


import com.example.UROSALUD.Domain.Dto.EstadosCitasDTO;
import com.example.UROSALUD.Domain.Mapper.EstadosCitasMapper;
import com.example.UROSALUD.Persistence.Repository.EstadosCitasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EstadosCitasService {
    @Autowired
    private EstadosCitasRepository estadosCitasRepository;


    public List<EstadosCitasDTO> getAll() {
        return estadosCitasRepository.findAll().stream().map(EstadosCitasMapper::toDto).collect(Collectors.toList());
    }

    public Optional<EstadosCitasDTO> findById(Long id) {
        return estadosCitasRepository.findById(id).map(EstadosCitasMapper::toDto);
    }

    public EstadosCitasDTO save(EstadosCitasDTO estadosCitasDTO) {
        estadosCitasRepository.save(EstadosCitasMapper.toEntity(estadosCitasDTO));
        return estadosCitasDTO;
    }
}
