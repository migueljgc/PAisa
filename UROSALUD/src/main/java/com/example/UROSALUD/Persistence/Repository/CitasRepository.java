package com.example.UROSALUD.Persistence.Repository;


import com.example.UROSALUD.Persistence.Entity.Citas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CitasRepository extends JpaRepository<Citas, Long> {
}
