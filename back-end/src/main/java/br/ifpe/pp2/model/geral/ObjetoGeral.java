package br.ifpe.pp2.model.geral;

import java.util.Date;
import java.util.Objects;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

@MappedSuperclass
public class ObjetoGeral {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer codigo;	
	@NotBlank
	private String nome;
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(iso = ISO.DATE_TIME)
	private Date dataRegistro;
	@DateTimeFormat(iso = ISO.DATE_TIME)
	private Date dataUltimaAtualizacao;
	
	public ObjetoGeral() {
		super();
	}

	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer Codigo) {
		this.codigo = Codigo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Date getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(Date dataRegistro) {
		this.dataRegistro = dataRegistro;
	}

	public Date getDataUltimaAtualizacao() {
		return dataUltimaAtualizacao;
	}

	public void setDataUltimaAtualizacao(Date dataUltimaAtualizacao) {
		this.dataUltimaAtualizacao = dataUltimaAtualizacao;
	}

	@Override
	public int hashCode() {
		return Objects.hash(dataRegistro, dataUltimaAtualizacao, codigo, nome);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ObjetoGeral other = (ObjetoGeral) obj;
		return Objects.equals(dataRegistro, other.dataRegistro)
				&& Objects.equals(dataUltimaAtualizacao, other.dataUltimaAtualizacao)
				&& Objects.equals(codigo, other.codigo) && Objects.equals(nome, other.nome);
	}
		
	
	
}
