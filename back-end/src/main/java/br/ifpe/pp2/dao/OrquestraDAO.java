package br.ifpe.pp2.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ifpe.pp2.model.Orquestra;

public interface OrquestraDAO extends JpaRepository<Orquestra, Integer> {

	public Orquestra findByNome(String nome);

	public Orquestra findByCodigo(Integer codigo);

	public List<Orquestra> findByNomeContainingIgnoreCase(String nome);

}
