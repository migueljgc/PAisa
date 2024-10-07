package com.example.UROSALUD.Controller;

import com.example.UROSALUD.Domain.Dto.PqrsDto;
import com.example.UROSALUD.Domain.Service.PqrsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Pqrs")
public class PqrsController {
    @Autowired
    PqrsService pqrsService;

    @PostMapping("/save")
    public PqrsDto save(@RequestBody PqrsDto pqrsDto){
        try {
            pqrsService.save(pqrsDto);
        }catch (Exception e){
            System.out.println(e);
        }
        return pqrsDto;
    }

    @GetMapping("/get")
    public List<PqrsDto> getAll(){
        return pqrsService.getAll();
    }
}
