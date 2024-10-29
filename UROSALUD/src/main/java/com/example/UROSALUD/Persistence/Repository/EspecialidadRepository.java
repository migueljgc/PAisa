package com.example.UROSALUD.Persistence.Repository;



import com.example.UROSALUD.Persistence.Entity.Especialidad;
import com.example.UROSALUD.Persistence.Entity.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EspecialidadRepository extends JpaRepository<Especialidad, Long> {
    Optional<Especialidad> findByNombre(String nombre);
}
