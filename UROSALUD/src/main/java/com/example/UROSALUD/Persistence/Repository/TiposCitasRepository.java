package com.example.UROSALUD.Persistence.Repository;


import com.example.UROSALUD.Persistence.Entity.TiposCitas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TiposCitasRepository extends JpaRepository<TiposCitas, Long> {
}
