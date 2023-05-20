export const formatarParaMoeda = (valor: string) => {
  const valorNumero = Number(valor);
  const resultado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return resultado.format(valorNumero);
};
