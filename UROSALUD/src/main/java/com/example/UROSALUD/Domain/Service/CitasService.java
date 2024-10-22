package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Domain.Dto.CitasDTO;
import com.example.UROSALUD.Domain.Mapper.CitasMapper;
import com.example.UROSALUD.Persistence.Repository.CitasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CitasService {
    @Autowired
    private CitasRepository citasRepository;


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
}
