package br.ifpe.pp2.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ifpe.pp2.dto.UsuarioDTO;
import br.ifpe.pp2.model.Categoria;
import br.ifpe.pp2.model.Usuario;
import br.ifpe.pp2.service.UsuarioService;

@RestController
@RequestMapping("/api")
public class UsuarioController {

	@Autowired
	UsuarioService usuarioService;

//	@PostMapping("/login")
//	public Boolean login(@RequestBody Usuario usuario, HttpSession sassao) {
//
//		Boolean loginSucesso = false;
//		Usuario usuarioEncontrado = this.usuarioService.login(usuario.getEmail(), usuario.getSenha());
//
//		if (usuarioEncontrado != null) {
//			sassao.setAttribute("usuarioLogado", usuarioEncontrado);
//			loginSucesso = true;
//			return loginSucesso;
//
//		} else {
//			return loginSucesso;
//		}
//	}
//	
	@PostMapping("/login")
	public ResponseEntity<UsuarioDTO>login(@RequestBody Usuario usuario, HttpSession sassao) {

		Usuario usuarioEncontrado = this.usuarioService.login(usuario.getEmail(), usuario.getSenha());

		if (usuarioEncontrado != null) {
			sassao.setAttribute("usuarioLogado", usuarioEncontrado);
			usuario.setCategoria(usuarioEncontrado.getCategoria());
			usuario.setNome(usuarioEncontrado.getNome());
			
			return ResponseEntity.ok().body(new UsuarioDTO(usuario));

		} else {
		
			return ResponseEntity.status(401).build();
		}
	}

	@PostMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}

	@GetMapping("/listarUsuarios")
	public List<UsuarioDTO> listarUsuario() {

		List<Usuario> listUsuario = this.usuarioService.listarUsuarios();
		List<UsuarioDTO> listUsuarioDTO = new ArrayList<UsuarioDTO>();

		listUsuarioDTO = listUsuario.stream().map(UsuarioDTO::new).collect(Collectors.toList());

		return listUsuarioDTO;
	}

	@GetMapping("/listarUsuariosAtivos")
	public List<UsuarioDTO> listarUsuariosAtivos() {

		List<Usuario> listUsuario = this.usuarioService.listarUsuariosAtivos();
		List<UsuarioDTO> listUsuarioDTO = new ArrayList<UsuarioDTO>();

		listUsuarioDTO = listUsuario.stream().map(UsuarioDTO::new).collect(Collectors.toList());

		return listUsuarioDTO;
	}
	
	@GetMapping("/listarUsuariosPendentes")
	public List<UsuarioDTO> listarUsuariosPendentes() {

		List<Usuario> listUsuario = this.usuarioService.listarUsuarios();
		List<UsuarioDTO> listUsuarioDTO = new ArrayList<UsuarioDTO>();

		listUsuarioDTO = listUsuario.stream().map(UsuarioDTO::new).collect(Collectors.toList());

		return listUsuarioDTO;
	}
	
	@GetMapping("/buscarUsuario/{id}")
	public UsuarioDTO buscarUsuarioPorId(@PathVariable Integer id) {

		Usuario usuario = this.usuarioService.buscarUsuarioPorId(id);

		return new UsuarioDTO(usuario);

	}

	@GetMapping("/listarMaestro")
	public List<UsuarioDTO> listarMaestro() {

		List<Usuario> listMaestro = this.usuarioService.listarMaestro(Categoria.MAESTRO);
		List<UsuarioDTO> listMaestroDTO = new ArrayList<UsuarioDTO>();

		listMaestroDTO = listMaestro.stream().map(UsuarioDTO::new).collect(Collectors.toList());

		return listMaestroDTO;

	}

	@GetMapping("/atualizarStatusUsuario/{id}")
	@CrossOrigin("http://localhost:3000")
	public void atualizarStatusUsuario(@PathVariable Integer id) {
		
		this.usuarioService.atualizarStatusUsuario(id);

	}

	@PostMapping("/inserirUsuario")
	public String salvarUsuario(@RequestBody @Valid Usuario usuario) throws Exception {
		try {
			this.usuarioService.salvarUsuario(usuario);
			return "Salvo com sucesso";
		} catch (Exception e) {
			return e.getMessage();
		}
	}

	@PostMapping("/deletarUsuario/{id}")
	public String deletarUsuario(@PathVariable Integer id) {

		this.usuarioService.deletarUsuarioPorId(id);
		return "Registro deletado";
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
