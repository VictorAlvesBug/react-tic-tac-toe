import { TEstado } from '../components/casa';

type TRetorno = [TEstado | null, boolean];

function retornarListaConjuntos(tamanho: number): number[][][] {
  const listaConjuntos: number[][][] = [];

  // Considerando conjuntos em linha (horizontais)
  for (let posY = 0; posY < tamanho; posY++) {
    const itensConjunto: number[][] = [];
    for (let posX = 0; posX < tamanho; posX++) {
      itensConjunto.push([posX, posY]);
    }
    listaConjuntos.push(itensConjunto);
  }

  // Considerando conjuntos em coluna (verticais)
  for (let posX = 0; posX < tamanho; posX++) {
    const itensConjunto: number[][] = [];
    for (let posY = 0; posY < tamanho; posY++) {
      itensConjunto.push([posX, posY]);
    }
    listaConjuntos.push(itensConjunto);
  }

  // Considerando conjunto da diagonal decrescente
  const itensConjuntoDiagonalDecrescente: number[][] = [];
  for (let posXY = 0; posXY < tamanho; posXY++) {
    itensConjuntoDiagonalDecrescente.push([posXY, posXY]);
  }
  listaConjuntos.push(itensConjuntoDiagonalDecrescente);

  // Considerando conjunto da diagonal crescente
  const itensConjuntoDiagonalCrescente: number[][] = [];
  for (let posX = 0; posX < tamanho; posX++) {
    const posY = tamanho - 1 - posX;
    itensConjuntoDiagonalCrescente.push([posX, posY]);
  }
  listaConjuntos.push(itensConjuntoDiagonalCrescente);

  return listaConjuntos;
}

export default function verificarVencedor(casas: TEstado[][]): TRetorno {
  const tamanho = casas.length;

  if (tamanho < 3 || tamanho > 10) {
    throw new Error(`Apenas tamanhos entre 3 e 10 são permitidos! tamanho: ${tamanho}`);
  }

  const listaConjuntos = retornarListaConjuntos(tamanho);

  const posicoesX: number[][] = [];
  const posicoesO: number[][] = [];
  let qtdePosicoesVazias = 0;

  casas.forEach((coluna, posY) => {
    coluna.forEach((casa, posX) => {
      const posicao = [posX, posY];
      switch (casa) {
        case 'X':
          posicoesX.push(posicao);
          break;
        case 'O':
          posicoesO.push(posicao);
          break;
       default:
          qtdePosicoesVazias++;
          break;
      }
    });
  });

  for (let conjunto of listaConjuntos) {
    if (
      conjunto.every((posicao) =>
        posicoesX.some((pX) => JSON.stringify(pX) === JSON.stringify(posicao))
      )
    ) {
      return ['X', true] as TRetorno;
    } else if (
      conjunto.every((posicao) =>
        posicoesO.some((pO) => JSON.stringify(pO) === JSON.stringify(posicao))
      )
    ) {
      return ['O', true] as TRetorno;
    }
  }

  return [null, qtdePosicoesVazias === 0] as TRetorno;
}
