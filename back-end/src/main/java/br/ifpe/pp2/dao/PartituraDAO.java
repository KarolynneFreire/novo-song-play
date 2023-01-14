package br.ifpe.pp2.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ifpe.pp2.model.Partitura;

public interface PartituraDAO extends JpaRepository<Partitura, Integer> {

	public List<Partitura> findByTipoContainingIgnoreCase(String tipo);

	public List<Partitura> findByNomeContainingIgnoreCase(String nome);
	
	//public long count(); 

	public Partitura findByCodigo(Integer codigo);

}
