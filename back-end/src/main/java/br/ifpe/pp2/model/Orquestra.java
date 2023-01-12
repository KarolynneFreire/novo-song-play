package br.ifpe.pp2.model;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import br.ifpe.pp2.model.geral.ObjetoGeral;

@Entity
public class Orquestra extends ObjetoGeral {

	@ManyToOne
	@JoinColumn(name = "FK_CODIGO_USUARIO")
	private Usuario codigoMaestro;

	public Orquestra() {
		super();
	}

	public Usuario getCodigoMaestro() {
		return codigoMaestro;
	}

	public void setCodigoMaestro(Usuario codigoMaestro) {
		this.codigoMaestro = codigoMaestro;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + Objects.hash(codigoMaestro);
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
		Orquestra other = (Orquestra) obj;
		return Objects.equals(codigoMaestro, other.codigoMaestro);
	}
	
	

}
