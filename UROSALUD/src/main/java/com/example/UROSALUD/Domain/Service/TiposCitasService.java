package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Domain.Dto.TiposCitasDTO;
import com.example.UROSALUD.Domain.Mapper.TiposCitasMapper;
import com.example.UROSALUD.Persistence.Repository.TiposCitasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TiposCitasService {
    @Autowired
    private TiposCitasRepository tiposCitasRepository;

    public List<TiposCitasDTO> getAll() {
        return tiposCitasRepository.findAll().stream().map(TiposCitasMapper::toDto).collect(Collectors.toList());
    }

    public Optional<TiposCitasDTO> findById(Long id) {
        return tiposCitasRepository.findById(id).map(TiposCitasMapper::toDto);
    }

    public TiposCitasDTO save(TiposCitasDTO tiposCitasDTO) {
        tiposCitasRepository.save(TiposCitasMapper.toEntity(tiposCitasDTO));
        return tiposCitasDTO;
    }
}
