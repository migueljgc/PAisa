package com.example.UROSALUD.Persistence.Repository;


import com.example.UROSALUD.Persistence.Entity.TiposIdentificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TiposIdentificacionRepository extends JpaRepository<TiposIdentificacion, Long> {
}
