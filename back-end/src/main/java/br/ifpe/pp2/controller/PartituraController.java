package br.ifpe.pp2.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.ifpe.pp2.dto.PartituraDTO;
import br.ifpe.pp2.model.Partitura;
import br.ifpe.pp2.service.PartituraService;

@RestController
@RequestMapping("/api")
public class PartituraController {

	@Autowired
	private PartituraService partituraService;

	@GetMapping("/listarPartitura")
	public List<Partitura> listarPartitura() {

		return this.partituraService.listarPartitura();

	}

	@GetMapping("/buscarPorNome/{nome}")
	public List<PartituraDTO> buscarPorNome(@PathVariable String nome) {

		List<Partitura> listaPartitura = this.partituraService.buscarPorNome(nome);
		List<PartituraDTO> listaPartituraDTO = new ArrayList<PartituraDTO>();

		listaPartituraDTO = listaPartitura.stream().map(PartituraDTO::new).collect(Collectors.toList());
		return listaPartituraDTO;
	}

	@GetMapping("/buscarPorCompositor/{compositor}")
	public List<PartituraDTO> bucarPorCompositor(@PathVariable String compositor) {

		List<Partitura> listaPartitura = this.partituraService.buscarPorCompositor(compositor);
		List<PartituraDTO> listaPartituraDTO = new ArrayList<PartituraDTO>();

		listaPartituraDTO = listaPartitura.stream().map(PartituraDTO::new).collect(Collectors.toList());

//		List<PartituraDTO> listaPartituraDTO = this.partituraService.buscarPorCompositor(compositor).stream()
//				.map(PartituraDTO::new).collect(Collectors.toList());

		return listaPartituraDTO;
	}
	
//	Upload
	@PostMapping("/salvarPartitura")
	public void salvarPartitura(@RequestBody Partitura partitura, MultipartFile pdf) {
		
		try {
			
			partitura.setDocumento(pdf.getBytes());
			this.partituraService.salvarPartitura(partitura);
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
//	//download
//	@GetMapping(consumes = "/baixarPartitura")
//	public File baixarPartitura() {
//		
//		return 
//		
//	}

	@PostMapping("/deletarPartitura/{codigo}")
	public String deletarPartitura(@PathVariable Integer codigo) {
		this.partituraService.deletarPartitura(codigo);
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