package com.example.UROSALUD.Persistence.Repository;

import com.example.UROSALUD.Persistence.Entity.TiposSolicitud;
import org.springframework.data.jpa.repository.JpaRepository;

@org.springframework.stereotype.Repository
public interface TipoSolicitudRepository extends JpaRepository<TiposSolicitud, Long> {
}
