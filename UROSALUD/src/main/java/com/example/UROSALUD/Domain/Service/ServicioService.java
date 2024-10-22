package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Domain.Dto.ServicioDTO;
import com.example.UROSALUD.Domain.Mapper.ServicioMapper;
import com.example.UROSALUD.Persistence.Repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServicioService {
    @Autowired
    private ServicioRepository servicioRepository;

    public List<ServicioDTO> getAll() {
        return servicioRepository.findAll().stream().map(ServicioMapper::toDto).collect(Collectors.toList());
    }

    public Optional<ServicioDTO> findById(Long id) {
        return servicioRepository.findById(id).map(ServicioMapper::toDto);
    }

    public ServicioDTO save(ServicioDTO servicioDTO) {
        servicioRepository.save(ServicioMapper.toEntity(servicioDTO));
        return servicioDTO;
    }
}
