package com.pineapple.pp;

import com.pineapple.pp.entities.User;
import com.pineapple.pp.repositories.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import java.util.stream.Stream;

@SpringBootApplication
@Configuration
public class PpApplication {

	public static void main(String[] args) { SpringApplication.run(PpApplication.class, args); }

//	@Bean
//	public ViewResolver viewResolver() {
//		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
//		resolver.setPrefix("/WEB-INF/");
//		resolver.setSuffix(".jsp");
//		resolver.setViewClass(JstlView.class);
//		return resolver;
//	}
	
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
