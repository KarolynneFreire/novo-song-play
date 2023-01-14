package br.ifpe.pp2.model;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;

import br.ifpe.pp2.model.geral.ObjetoGeral;

@Entity
public class Partitura extends ObjetoGeral {

	@NotBlank(message = "Campo não pode ser vazio")
	private String tipo;
//	@ManyToOne
//	private Orquestra orquestra;
	private int views;
	@Lob
	private byte[] documento;

	public Partitura() {
		super();
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

//	public Orquestra getOrquestra() {
//		return orquestra;
//	}
//
//	public void setOrquestra(Orquestra orquestra) {
//		this.orquestra = orquestra;
//	}

	public int getViews() {
		return views;
	}

	public void setViews(int views) {
		this.views = views;
	}

	public byte[] getDocumento() {
		return documento;
	}

	public void setDocumento(byte[] documento) {
		this.documento = documento;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + Objects.hash(tipo, documento,  views);
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
		Partitura other = (Partitura) obj;
		return Objects.equals(tipo, other.tipo) && Objects.equals(documento, other.documento)
				 && views == other.views;
	}

	

}
