package br.ifpe.pp2.model;

import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.br.CPF;

import br.ifpe.pp2.model.geral.ObjetoGeral;

@Entity
public class Usuario extends ObjetoGeral {

	@CPF(message = "Numero de CPF invalido")
	private String cpf;
	@Email(message = "formato invalido")
	private String email;
	@Enumerated(EnumType.STRING)
	private Categoria categoria;
	@OneToMany
	private List<Orquestra> orquestra;
//	@NotBlank(message = "Campo senha, nao pode ser vazio")
	private String senha;
	private Boolean ativo;
	

	public Usuario() {
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

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	
	public Boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + Objects.hash(categoria, cpf, email, orquestra, senha);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		return categoria == other.categoria && Objects.equals(cpf, other.cpf) && Objects.equals(email, other.email)
				&& Objects.equals(orquestra, other.orquestra) && Objects.equals(senha, other.senha);
	}

	

}
