package br.ifpe.pp2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import br.ifpe.pp2.service.UsuarioService;

@SpringBootApplication
@ServletComponentScan
public class Pp2GestaoDocumentoApplication implements CommandLineRunner {
	
	@Autowired
	private UsuarioService usuarioService;

	public static void main(String[] args) {
		SpringApplication.run(Pp2GestaoDocumentoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("############################################################");
		System.out.println("Criando usuario admin, login: admin@pp2.com, senha: 12345");
		System.out.println("############################################################");
		
		this.usuarioService.dadosIniciais();
		
	}
	
	

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*");
			}
		};
	}


}
