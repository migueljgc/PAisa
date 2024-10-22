package com.example.UROSALUD.Persistence.Repository;

import com.example.UROSALUD.Persistence.Entity.Pqrs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PqrsRespository extends JpaRepository<Pqrs, Long> {
}
