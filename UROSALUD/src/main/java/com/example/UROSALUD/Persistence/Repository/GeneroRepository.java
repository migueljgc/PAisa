package com.example.UROSALUD.Persistence.Repository;

import com.example.UROSALUD.Persistence.Entity.Genero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneroRepository extends JpaRepository<Genero, Long> {
}
