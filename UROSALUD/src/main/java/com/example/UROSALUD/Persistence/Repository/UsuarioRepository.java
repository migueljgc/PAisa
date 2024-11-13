package com.example.UROSALUD.Persistence.Repository;


import com.example.UROSALUD.Persistence.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByIdentificacion(String identificacion);
    User findByIdentificacion(String username);
    User findByEmail(String email);


}
