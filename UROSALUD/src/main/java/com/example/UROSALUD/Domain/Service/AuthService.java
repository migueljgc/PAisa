package com.example.UROSALUD.Domain.Service;



import com.example.UROSALUD.Controller.models.AuthResponse;
import com.example.UROSALUD.Controller.models.AuthenticationRequest;
import com.example.UROSALUD.Controller.models.RegisterRequest;
import com.example.UROSALUD.Persistence.Entity.User;
import org.springframework.security.core.Authentication;

public interface AuthService {
    AuthResponse register (RegisterRequest Request );
    AuthResponse registerUser (RegisterRequest Request );
    AuthResponse authenticate (AuthenticationRequest Request );
    User getCurrentUser(Authentication authentication);
}
