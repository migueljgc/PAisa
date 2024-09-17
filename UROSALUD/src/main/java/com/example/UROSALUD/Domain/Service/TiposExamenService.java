package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Domain.Dto.TiposExamenDTO;
import com.example.UROSALUD.Domain.Mapper.TiposExamenMapper;
import com.example.UROSALUD.Persistence.Repository.TiposExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TiposExamenService {
    @Autowired
    private TiposExamenRepository tiposExamenRepository;

    public List<TiposExamenDTO> getAll() {
        return tiposExamenRepository.findAll().stream().map(TiposExamenMapper::toDto).collect(Collectors.toList());
    }

    public Optional<TiposExamenDTO> findById(Long id) {
        return tiposExamenRepository.findById(id).map(TiposExamenMapper::toDto);
    }

    public TiposExamenDTO save(TiposExamenDTO tiposExamenDTO) {
        tiposExamenRepository.save(TiposExamenMapper.toEntity(tiposExamenDTO));
        return tiposExamenDTO;
    }
}
