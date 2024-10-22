package com.example.UROSALUD.Domain.Service;

import com.example.UROSALUD.Persistence.Entity.Swiper;
import com.example.UROSALUD.Persistence.Repository.SwiperRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SwiperService {
    @Autowired
    private SwiperRepository swiperRepository;

    public List<Swiper> getAll(){
        return swiperRepository.findAll();
    }
    public Swiper save(Swiper swiper){
        return swiperRepository.save(swiper);
    }
    public boolean deleteById(Long id) {
        if (swiperRepository.existsById(id)) {
            swiperRepository.deleteById(id);
            return true;
        } else {
            throw new EntityNotFoundException("Swiper con id " + id + " no encontrado");
        }
    }


}
