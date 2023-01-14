package br.ifpe.pp2.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ifpe.pp2.dao.PartituraDAO;
import br.ifpe.pp2.model.Partitura;

@Service
public class PartituraService {

	@Autowired
	PartituraDAO partituraDAO;

	public List<Partitura> listarPartitura() {
		return partituraDAO.findAll();
	}

	public List<Partitura> buscarPorNome(String nome) {
		return this.partituraDAO.findByNomeContainingIgnoreCase(nome);

	}

	public Long contagemPartitura() {
		return partituraDAO.count();
	}

	public String salvarPartitura(Partitura partitura) {

		partitura.setDataRegistro(new Date());
		partitura.setDataUltimaAtualizacao(new Date());
		partitura.setTipo(partitura.getTipo().toUpperCase());
		partitura.setNome(partitura.getNome().toUpperCase());

		this.partituraDAO.save(partitura);
		return "Ok";
	}

	public void deletarPartitura(Integer codigo) {
		this.partituraDAO.deleteById(codigo);
	}
}
