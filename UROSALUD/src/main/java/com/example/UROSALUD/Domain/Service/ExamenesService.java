package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Domain.Dto.ExamenesDTO;
import com.example.UROSALUD.Domain.Mapper.ExamenesMapper;
import com.example.UROSALUD.Persistence.Repository.ExamenesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExamenesService {
    @Autowired
    private ExamenesRepository examenesRepository;

    public List<ExamenesDTO> getAll() {
        return examenesRepository.findAll().stream().map(ExamenesMapper::toDto).collect(Collectors.toList());
    }

    public Optional<ExamenesDTO> findById(Long id) {
        return examenesRepository.findById(id).map(ExamenesMapper::toDto);
    }

    public ExamenesDTO save(ExamenesDTO examenesDTO) {
        examenesRepository.save(ExamenesMapper.toEntity(examenesDTO));
        return examenesDTO;
    }
}
