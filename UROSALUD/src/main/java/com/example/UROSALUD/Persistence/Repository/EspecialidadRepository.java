package com.example.UROSALUD.Persistence.Repository;



import com.example.UROSALUD.Persistence.Entity.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EspecialidadRepository extends JpaRepository<Especialidad, Long> {
}
