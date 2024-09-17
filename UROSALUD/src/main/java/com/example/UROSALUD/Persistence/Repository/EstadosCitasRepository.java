package com.example.UROSALUD.Persistence.Repository;


import com.example.UROSALUD.Persistence.Entity.EstadosCitas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadosCitasRepository extends JpaRepository<EstadosCitas, Long> {
}
