package br.ifpe.pp2.dto;

import br.ifpe.pp2.model.Orquestra;
import br.ifpe.pp2.model.geral.ObjetoGeral;

public class OrquestraDTO extends ObjetoGeral{

	
	private UsuarioDTO codigoMaestro;
		
	public OrquestraDTO(Orquestra orquestra) {
		super();
		
		this.setCodigo(orquestra.getCodigo());
		this.setNome(orquestra.getNome());
		this.setDataRegistro(orquestra.getDataRegistro());
		this.setDataUltimaAtualizacao(orquestra.getDataUltimaAtualizacao());		
		this.codigoMaestro = new UsuarioDTO(orquestra.getCodigoMaestro());
		
	}

	public OrquestraDTO() {
		super();
	}

	public UsuarioDTO getCodigoMaestro() {
		return codigoMaestro;
	}

	public void setCodigoMaestro(UsuarioDTO codigoMaestro) {
		this.codigoMaestro = codigoMaestro;
	}
	
	
}
