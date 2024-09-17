package com.example.UROSALUD.Persistence.Repository;


import com.example.UROSALUD.Persistence.Entity.TiposExamen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TiposExamenRepository extends JpaRepository<TiposExamen, Long> {
}
