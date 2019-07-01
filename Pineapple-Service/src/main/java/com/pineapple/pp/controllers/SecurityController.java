package com.pineapple.pp.controllers;

import com.pineapple.pp.services.SecurityService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SecurityController {

    @PostMapping(path="/authenticate")
    @ResponseBody
    public boolean checkToken(@RequestBody String token){
        return SecurityService.checkUserToken(token);
    }
}
