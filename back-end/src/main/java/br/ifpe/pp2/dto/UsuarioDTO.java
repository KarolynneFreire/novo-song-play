package br.ifpe.pp2.dto;

import java.util.List;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.br.CPF;

import br.ifpe.pp2.model.Categoria;
import br.ifpe.pp2.model.Orquestra;
import br.ifpe.pp2.model.Usuario;
import br.ifpe.pp2.model.geral.ObjetoGeral;

public class UsuarioDTO extends ObjetoGeral {

	@CPF(message = "Numero de CPF invalido")
	private String cpf;
	@Email(message = "formato invalido")
	private String email;
	@Enumerated(EnumType.STRING)
	private Categoria categoria;
	private List<Orquestra> orquestra;

	public UsuarioDTO(Usuario usuario) {
		super();

		this.setCodigo(usuario.getCodigo());
		this.setNome(usuario.getNome());
		this.setDataRegistro(usuario.getDataRegistro());
		this.setDataUltimaAtualizacao(usuario.getDataUltimaAtualizacao());
		this.cpf = usuario.getCpf();
		this.email = usuario.getEmail();
		this.categoria = usuario.getCategoria();
		this.orquestra = usuario.getOrquestra();
	}

	public UsuarioDTO() {
		super();
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public List<Orquestra> getOrquestra() {
		return orquestra;
	}

	public void setOrquestra(List<Orquestra> orquestra) {
		this.orquestra = orquestra;
	}


}
