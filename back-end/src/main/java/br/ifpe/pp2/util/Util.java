package br.ifpe.pp2.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Util {

//	public static int calcularIdade(Date dataNascimento) {
//		LocalDate hj = LocalDate.now();
//		LocalDate nasc = converterParaLocalDate(dataNascimento);
//		Period periodo = Period.between(nasc, hj);
//		return periodo.getYears();
//	}
//	
//	public static LocalDate converterParaLocalDate(Date date) {
//        return Instant.ofEpochMilli(date.getTime()).atZone(ZoneId.systemDefault()).toLocalDate();
//    }
	
	/**
	 * Criptografa uma string usando MD5 Este método deve ser usado em duas
	 * ocasiões: 1) ao criar um novo usuário, no service, antes de enviar para o DAO
	 * 2) ao efetuar login, antes de enviar para o DAO o login/senha para ser
	 * verificado
	 * 
	 * @param senha
	 * @return senha criptografada
	 * @throws NoSuchAlgorithmException - reporta falhas na tentativa de
	 *                                  criptografar
	 */
	public static String md5(String senha) {
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("MD5");
			BigInteger hash = new BigInteger(1, messageDigest.digest(senha.getBytes()));
			return hash.toString(16);
		} catch (Exception e) {
			return "";
		}
	}

//	public static void main(String[] args) throws ParseException {
//		SimpleDateFormat sds = new SimpleDateFormat("yyyy-MM-dd");
//		Date data = sds.parse("2000-12-19");
//		System.out.println("Anos: " + calcularIdade(data));
//	}
	

}
