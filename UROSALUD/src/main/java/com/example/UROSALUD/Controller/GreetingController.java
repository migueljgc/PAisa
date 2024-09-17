package com.example.UROSALUD.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/greeting")
public class GreetingController {

    @GetMapping("/sayHelloPublic")
    public String sayHello (){
        return "HELLO from API MIGUE";
    }
    @GetMapping("/sayHelloPrivate")
    public String sayHelloPrivate (){
        return "HELLO from API MIGUE private";
    }

}
