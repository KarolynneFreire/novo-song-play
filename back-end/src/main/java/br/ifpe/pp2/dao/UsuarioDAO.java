package br.ifpe.pp2.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.ifpe.pp2.model.Categoria;
import br.ifpe.pp2.model.Usuario;

public interface UsuarioDAO extends JpaRepository<Usuario, Integer>{

	public Usuario findByCpf(String cpf);
	
	public Usuario findByCodigo(Integer codigo);
	
	public Usuario findByEmailAndSenha(String email, String senha);
	
	public List<Usuario> findByNomeContainingIgnoreCase(String nome);
	
	public List<Usuario> findByAtivoIsTrue();
	
	public List<Usuario> findByAtivoIsFalse();
	
	public Usuario findByEmail(String email);
	
	public List<Usuario> findByCategoria(Categoria categoria);
		
	@Modifying
	@Query("UPDATE Usuario c SET c.ativo = :ativo WHERE c.codigo = :codigo")
    void setAtivo(@Param("ativo") Boolean ativo ,@Param("codigo") Integer codigo);

	
	
	
}
