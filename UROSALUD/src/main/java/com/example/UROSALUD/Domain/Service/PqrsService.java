package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Domain.Dto.PqrsDto;
import com.example.UROSALUD.Domain.Mapper.PqrsMapper;
import com.example.UROSALUD.Persistence.Entity.Pqrs;
import com.example.UROSALUD.Persistence.Repository.PqrsRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PqrsService {
    @Autowired
    PqrsRespository pqrsRespository;

    public PqrsDto save(PqrsDto pqrsDto){
        pqrsRespository.save(PqrsMapper.toEntity(pqrsDto));
        return pqrsDto;
    }
    public List<PqrsDto> getAll (){
       return pqrsRespository.findAll().stream().map(PqrsMapper::toDto).collect(Collectors.toList());

    }
}
