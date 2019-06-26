package com.pineapple.pp;

import com.pineapple.pp.entities.User;
import com.pineapple.pp.repositories.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.core.Ordered;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import java.util.Collections;
import java.util.stream.Stream;

@SpringBootApplication
@Configuration
@EnableJpaAuditing
public class PpApplication {

	public static void main(String[] args) { SpringApplication.run(PpApplication.class, args); }
	
	@Bean
	ApplicationRunner init(UserRepository repository) {
		return args -> {
			Stream.of("Ferrari", "Jaguar", "Porsche", "Lamborghini", "Bugatti",
				"AMC Gremlin", "Triumph Stag", "Ford Pinto", "Yugo GV").forEach(name -> {
				User user = new User();
				user.setUsername(name);
				repository.save(user);
			});
			repository.findAll().forEach(System.out::println);
		};
	}
}
