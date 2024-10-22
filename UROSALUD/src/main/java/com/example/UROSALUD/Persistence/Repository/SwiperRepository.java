package com.example.UROSALUD.Persistence.Repository;

import com.example.UROSALUD.Persistence.Entity.Swiper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SwiperRepository extends JpaRepository<Swiper, Long> {
}
