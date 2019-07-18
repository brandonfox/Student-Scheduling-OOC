package com.pineapple.pp;

import com.pineapple.pp.utils.NetConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.PostConstruct;
import java.io.BufferedReader;
import java.net.Inet4Address;
import java.net.URL;
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
