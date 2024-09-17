package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Domain.Dto.GeneroDTO;
import com.example.UROSALUD.Domain.Mapper.GeneroMapper;
import com.example.UROSALUD.Persistence.Repository.GeneroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GeneroService {
    @Autowired
    private GeneroRepository generoRepository;

    public List<GeneroDTO> getAll() {
        return generoRepository.findAll().stream().map(GeneroMapper::toDto).collect(Collectors.toList());
    }

    public Optional<GeneroDTO> findById(Long id) {
        return generoRepository.findById(id).map(GeneroMapper::toDto);
    }

    public GeneroDTO save(GeneroDTO generoDTO) {
        generoRepository.save(GeneroMapper.toEntity(generoDTO));
        return generoDTO;
    }
}
