package br.ifpe.pp2.config;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

//@WebFilter("/*")
public class FiltroUsuarioLogado implements Filter {

//	private String[] pathsLiberados = { "/acessoNegado", "/h2(.*)", "/api/login", "/api/logout","/api/inserirUsuario","/api/listarOrquestras","/api/listarUsuarios" };
	private String[] pathsLiberados = { "/(.*)" }; /*Libera todos os EndPoints*/
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		HttpSession sessao = req.getSession();

		String path = req.getRequestURI();
		// Verificar se o path chamado está na lista dos liberados
		for (String livre : pathsLiberados) {
			if (path.matches(livre)) {
				chain.doFilter(request, response);
				return;
			}
		}

		if (sessao != null && sessao.getAttribute("usuarioLogado") != null) {
			chain.doFilter(request, response);
		} else {
			res.sendRedirect("/acessoNegado");
		}
	}

}
