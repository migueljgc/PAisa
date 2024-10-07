package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Dto.CitasDTO;
import com.example.UROSALUD.Domain.Dto.EspecialidadDTO;
import com.example.UROSALUD.Domain.Service.CitasService;
import com.example.UROSALUD.Domain.Service.EspecialidadService;
import com.example.UROSALUD.Persistence.Entity.Horario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Citas")
public class CitasController {
    @Autowired
    private CitasService citasService;

    @PostMapping("/save")
    public CitasDTO save(@RequestBody CitasDTO citasDTO){
        return citasService.save(citasDTO);
    }

    @GetMapping("/get")
    public List<CitasDTO> get() {
        return citasService.getAll();
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody CitasDTO citasDTO) {
        Optional<CitasDTO> especialidadOptional = citasService.findById(citasDTO.getId());
        if (especialidadOptional.isPresent()) {
            citasService.save(citasDTO);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/doctor/{doctorId}")
    public List<Horario> obtenerHorariosDisponibles(@PathVariable Long doctorId) {
        return citasService.obtenerHorariosDisponibles(doctorId);
    }

    @PostMapping("/reservar")
    public ResponseEntity<String> reservarCita(@RequestParam Long doctorId, @RequestParam String hora) {
        LocalTime horaCita = LocalTime.parse(hora);
        boolean reservada = citasService.reservarCita(doctorId, horaCita);
        if (reservada) {
            return ResponseEntity.ok("Cita reservada exitosamente");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No hay citas disponibles en esa hora");
        }
    }
}
