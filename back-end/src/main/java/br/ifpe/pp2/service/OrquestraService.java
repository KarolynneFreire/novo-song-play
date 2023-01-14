package br.ifpe.pp2.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ifpe.pp2.dao.OrquestraDAO;
import br.ifpe.pp2.model.Categoria;
import br.ifpe.pp2.model.Orquestra;
import br.ifpe.pp2.model.Usuario;

@Service
public class OrquestraService {

	@Autowired
	OrquestraDAO orquestraDao;

	@Autowired
	UsuarioService usuarioService;

	public List<Orquestra> listarOrquestras() {
		return this.orquestraDao.findAll();
	}

	public Orquestra buscarOrquestraPorId(Integer codigo) {
		return this.orquestraDao.findByCodigo(codigo);
	}

	public Orquestra buscarOrquestraPorNome(String nome) {
		return this.orquestraDao.findByNome(nome.toUpperCase());
	}

	public void salvarOrquetra(Orquestra orquestra) throws Exception {
		Orquestra orquestraExite = this.orquestraDao.findByCodigo(orquestra.getCodigo());
		Usuario usuarioExiste = this.usuarioService.buscarUsuarioPorId(orquestra.getCodigoMaestro().getCodigo());

		if (usuarioExiste == null) {
			throw new Exception("Usuario não cadastrado");
		}

		if (usuarioExiste.getCategoria().compareTo(Categoria.MAESTRO) != 0) {
			throw new Exception("Não é MAESTRO");
		}

		if (orquestraExite == null) {
			if (this.orquestraDao.findByNome(orquestra.getNome().toUpperCase()) != null) {
				throw new Exception("Ja existe Orquestra cadastrada com esse Nome.");
			}
			orquestra.setDataRegistro(new Date());
		}

		if (orquestraExite != null) {

			orquestra.setDataRegistro(orquestraExite.getDataRegistro());
		}
		orquestra.setDataUltimaAtualizacao(new Date());
		orquestra.setNome(orquestra.getNome().toUpperCase());

		this.orquestraDao.save(orquestra);
	}

	public void deletarOrquetra(Integer codigo) {
		this.orquestraDao.deleteById(codigo);
	}
}
