package br.ifpe.pp2.dto;

import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;

import br.ifpe.pp2.model.Partitura;
import br.ifpe.pp2.model.geral.ObjetoGeral;

public class PartituraDTO extends ObjetoGeral {

	@NotBlank(message = "Campo não pode ser vazio")
	private String tipo;
	//private OrquestraDTO orquestra;
	private int views;
	@Lob
	private byte[] documento;

	public PartituraDTO() {
		super();
	}

	public PartituraDTO(Partitura partitura) {
		super();
		this.setCodigo(partitura.getCodigo());
		this.setNome(partitura.getNome());
		this.setDataRegistro(partitura.getDataRegistro());
		this.setDataUltimaAtualizacao(partitura.getDataUltimaAtualizacao());
		this.tipo = partitura.getTipo();
//		this.orquestra = new OrquestraDTO(partitura.getOrquestra());
		this.views = partitura.getViews();
		this.documento = partitura.getDocumento();
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

//	public OrquestraDTO getOrquestra() {
//		return orquestra;
//	}
//
//	public void setOrquestra(OrquestraDTO orquestra) {
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

}

