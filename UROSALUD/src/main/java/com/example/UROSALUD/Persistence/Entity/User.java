package com.example.UROSALUD.Persistence.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigInteger;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Usuario")
public class User implements UserDetails {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;

    @Column(name = "Nombre")
    private String name;

    @Column(name = "Apellido_Persona")
    private String lastName;

    @Column(name = "Correo")
    private String email;

    @JoinColumn(name = "ID_Genero")
    @ManyToOne
    private Genero genero;

    @JoinColumn(name = "ID_TiposIdentificacion")
    @ManyToOne
    private TiposIdentificacion tiposIdentificacion;

    @Column(name = "Identificacion", unique = true)
    private String identificacion;

    @Column(name = "Contraseña")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "Roles")
    private Role role;

    @Column(name = "Estado_Usuario")
    private String stateUser;

    @Column(name = "Direccion")
    private String direccion;


    @Column(name = "Numero", unique = true)
    private BigInteger number;

    @JoinColumn(name = "ID_Especialidad")
    @ManyToOne
    private Especialidad especialidad;

    @Lob
    @Column(name = "Imagen", columnDefinition = "LONGBLOB")
    private byte[] img;




    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return identificacion;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
