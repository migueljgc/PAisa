package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Domain.Dto.TiposIdentificacionDTO;
import com.example.UROSALUD.Domain.Mapper.TiposIdentificacionMapper;
import com.example.UROSALUD.Persistence.Repository.TiposIdentificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TiposIdentificacionService {
    @Autowired
    private TiposIdentificacionRepository tiposIdentificacionRepository;

    public List<TiposIdentificacionDTO> getAll() {
        return tiposIdentificacionRepository.findAll().stream().map(TiposIdentificacionMapper::toDto).collect(Collectors.toList());
    }

    public Optional<TiposIdentificacionDTO> findById(Long id) {
        return tiposIdentificacionRepository.findById(id).map(TiposIdentificacionMapper::toDto);
    }

    public TiposIdentificacionDTO save(TiposIdentificacionDTO tiposIdentificacionDTO) {
        tiposIdentificacionRepository.save(TiposIdentificacionMapper.toEntity(tiposIdentificacionDTO));
        return tiposIdentificacionDTO;
    }
}
