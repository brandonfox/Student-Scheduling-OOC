package com.pineapple.pp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@Configuration
@EnableJpaAuditing
public class PpApplication {
    
    @PostConstruct
    public void init(){
        TimeZone.setDefault(TimeZone.getTimeZone("GMT+7:00"));
    }
    
    public static void main(String[] args) { SpringApplication.run(PpApplication.class, args); }
}
