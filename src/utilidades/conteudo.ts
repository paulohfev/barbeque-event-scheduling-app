export const formatarParaMoeda = (valor: string) => {
  const valorNumero = Number(valor);
  const resultado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return resultado.format(valorNumero);
};

export const formatarData = (data: string) => {
  const d = new Date(data);
  const dia = d.getDate();
  const mes = d.getMonth();
  const ano = d.getFullYear();
  const novaData = `${dia}/${mes}/${ano}`;

  return novaData;
};
