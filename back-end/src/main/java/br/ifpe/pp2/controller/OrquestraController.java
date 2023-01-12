package br.ifpe.pp2.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ifpe.pp2.dto.OrquestraDTO;
import br.ifpe.pp2.model.Orquestra;
import br.ifpe.pp2.service.OrquestraService;

@RestController
@RequestMapping("/api")
public class OrquestraController {

	@Autowired
	private OrquestraService orquestraService;


	@GetMapping("/listarOrquestras")
	public List<OrquestraDTO> listarOrquestras() {

		List<Orquestra> listarOrquesta = this.orquestraService.listarOrquestras();
		List<OrquestraDTO> listarOrquestraDTO = new ArrayList<OrquestraDTO>();

		listarOrquestraDTO = listarOrquesta.stream().map(OrquestraDTO::new).collect(Collectors.toList());

		return listarOrquestraDTO;
	}

	@PostMapping("/inserirOrquestra")
	public String inserirOrquetra(@RequestBody Orquestra orquestra) throws Exception {
		try {
			this.orquestraService.salvarOrquetra(orquestra);
			return "Salvo";

		} catch (Exception e) {
			return e.getMessage();
		}
	}

	@PostMapping("/deleteOrquestra/{codigo}")
	public String deletarOrquetra(@PathVariable Integer codigo) {
		this.orquestraService.deletarOrquetra(codigo);
		return "Registro Deletado";
	}
	
	

	/*
	 * @ResponseStatus(HttpStatus.BAD_REQUEST)
	 * 
	 * @ExceptionHandler(MethodArgumentNotValidException.class) public Map<String,
	 * String> handleValidateException(MethodArgumentNotValidException ex) {
	 * Map<String, String> errors = new HashMap<>();
	 * 
	 * ex.getBindingResult().getAllErrors().forEach((error) -> { String fieldName =
	 * ((FieldError) error).getField(); String errorMessage =
	 * error.getDefaultMessage(); errors.put(fieldName, errorMessage); }); return
	 * errors; }
	 */
}
