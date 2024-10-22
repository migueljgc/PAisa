package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Domain.Dto.TiposSolicitudDTO;
import com.example.UROSALUD.Domain.Mapper.TiposSolicitudMapper;
import com.example.UROSALUD.Persistence.Repository.TipoSolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TiposSolicitudService {
    @Autowired
    private TipoSolicitudRepository tipoSolicitudRepository;

    public TiposSolicitudDTO save(TiposSolicitudDTO tiposSolicitudDTO) {
        tipoSolicitudRepository.save(TiposSolicitudMapper.toEntinty(tiposSolicitudDTO));
        return tiposSolicitudDTO;
    }

    public List<TiposSolicitudDTO> getAll() {
        return tipoSolicitudRepository.findAll().stream().map(TiposSolicitudMapper::toDto).collect(Collectors.toList());
    }

    public Optional<TiposSolicitudDTO> findById(Long id) {
        return tipoSolicitudRepository.findById(id).map(TiposSolicitudMapper::toDto);
    }
}
