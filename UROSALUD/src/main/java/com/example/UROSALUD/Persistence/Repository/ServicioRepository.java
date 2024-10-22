package com.example.UROSALUD.Persistence.Repository;



import com.example.UROSALUD.Persistence.Entity.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
}
