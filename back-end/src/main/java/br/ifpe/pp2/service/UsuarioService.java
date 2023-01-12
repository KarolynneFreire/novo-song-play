package br.ifpe.pp2.service;

import java.util.Date;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.ifpe.pp2.dao.UsuarioDAO;
import br.ifpe.pp2.model.Categoria;
import br.ifpe.pp2.model.Usuario;
import br.ifpe.pp2.util.Util;

@Service
public class UsuarioService {

	static String PASSWORD = "1234";
	@Autowired
	private UsuarioDAO usuarioDao;

//Login
	public Usuario login(String email, String senha) {

		String senhaCrip = Util.md5(senha);

		Usuario usuario = this.usuarioDao.findByEmailAndSenha(email, senhaCrip);
		if (usuario != null) {

			return usuario;
		}
		return null;
	}

//Listar Todos
	public List<Usuario> listarUsuarios() {

		return this.usuarioDao.findAll();

	}

//Listar Usuarios Ativos
	public List<Usuario> listarUsuariosAtivos() {

		return this.usuarioDao.findByAtivoIsTrue();
	}

//Listar Usuario Pendentes
	public List<Usuario> listarUsuariosPententes() {

		return this.usuarioDao.findByAtivoIsFalse();
	}

//Buscar por Id
	public Usuario buscarUsuarioPorId(Integer codigo) {

		return this.usuarioDao.findByCodigo(codigo);

	}

//Listar Maestro
	public List<Usuario> listarMaestro(Categoria maestro) {

		return this.usuarioDao.findByCategoria(maestro);
	}

//Ativar/Desativar Usuario
	@Transactional
	public void atualizarStatusUsuario(Integer codigo) {

		Usuario usuario = this.usuarioDao.findByCodigo(codigo);

		if (usuario.getAtivo() == false) {
			this.usuarioDao.setAtivo(true, codigo);
		} else {
			this.usuarioDao.setAtivo(false, codigo);
		}
	}

// Salvar
	public void salvarUsuario(Usuario usuario) throws Exception {

		Usuario usuarioExiste = this.buscarUsuarioPorId(usuario.getCodigo());
		if (usuario.getCodigo() == null) {
			if (this.usuarioDao.findByCpf(usuario.getCpf()) != null) {
				throw new Exception("Já existe um usuario cadastrado com esse CPF");
			}

			if (this.usuarioDao.findByEmail(usuario.getEmail()) != null) {
				throw new Exception("Esse email já sendo utilizado por outro usuario");
			}

			if (usuario.getOrquestra() != null && usuario.getCategoria() == Categoria.MAESTRO) {
				throw new Exception("Maestro não pode ser Musico em Orquestra");
			}
			
			if (usuario.getOrquestra() != null && usuario.getCategoria() == Categoria.ASSISTENTE) {
				throw new Exception("Maestro não pode ser Musico em Orquestra");
			}
			usuario.setSenha(Util.md5(usuario.getSenha()));
//			usuario.setSenha(PASSWORD);
			usuario.setDataRegistro(new Date());
			usuario.setAtivo(false);
		}
// Editar
		if (usuario.getCodigo() != null) {
			if (usuario.getOrquestra() != null && usuario.getCategoria() == Categoria.MAESTRO) {
				throw new Exception("Maestro não pode ser Musico em Orquestra");
			}
			
			if (usuario.getOrquestra() != null && usuario.getCategoria() == Categoria.ASSISTENTE) {
				throw new Exception("Maestro não pode ser Musico em Orquestra");
			}

			usuario.setCpf(usuarioExiste.getCpf());
			usuario.setEmail(usuarioExiste.getEmail());
			usuario.setSenha(usuarioExiste.getSenha());
			usuario.setDataRegistro(usuarioExiste.getDataRegistro());

		}

		usuario.setDataUltimaAtualizacao(new Date());
		usuario.setNome(usuario.getNome().toUpperCase());

		this.usuarioDao.save(usuario);

	}

//Deletar
	public void deletarUsuarioPorId(Integer codigo) {

		this.usuarioDao.deleteById(codigo);
	}

// Reset de Senha
	public void alterarSenha(Usuario usuario) {

		Usuario usuario1 = this.usuarioDao.findByCodigo(usuario.getCodigo());

		usuario1.setSenha(Util.md5(usuario.getSenha()));
		usuario1.setDataUltimaAtualizacao(new Date());

		this.usuarioDao.save(usuario1);

	}

//Dados iniciais
	public void dadosIniciais() {

		Usuario admin = new Usuario();

		admin.setAtivo(true);
		admin.setCategoria(Categoria.ASSISTENTE);
		admin.setNome("Admin");
		admin.setSenha("12345");
		admin.setEmail("admin@pp2.com");
		admin.setDataRegistro(new Date());

		try {
			salvarUsuario(admin);
		} catch (Exception e) {
			System.out.println("Usuario Admin já exite");
		}

	}

}
