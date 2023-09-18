import { useEffect, useState } from 'react';
import Casa, { TJogador, TEstado } from './casa';
import verificarVencedor from '../utils/verificarVencedor';

export default function Tabuleiro() {
  const [tamanhoAtual, setTamanhoAtual] = useState(3);
  const [jogadorAtual, setJogadorAtual] = useState<TJogador>('X');
  const [ganhador, setGanhador] = useState<TJogador | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const initialCasas = Array(tamanhoAtual)
    .fill(0)
    .map((_) =>
      Array(tamanhoAtual)
        .fill(0)
        .map((_) => null as TEstado)
    );

  const [casas, setCasas] = useState<TEstado[][]>(initialCasas);

  useEffect(() => {
    const [vencedor, fimDeJogo] = verificarVencedor(casas);

    setGanhador(vencedor as TJogador);
    setGameOver(fimDeJogo);
  }, [casas]);

  if (tamanhoAtual < 3 || tamanhoAtual > 10) {
    throw new Error(
      `Apenas tamanhos entre 3 e 10 são permitidos! tamanhoAtual: ${tamanhoAtual}`
    );
  }

  useEffect(() => {
    setJogadorAtual('X');
    setGanhador(null);
    setGameOver(false);
    setCasas(initialCasas);
  }, [tamanhoAtual]);

  const handleJogar = (posX: number, posY: number) => {
    if (!gameOver && casas && casas[posX][posY] === null) {
      setCasas((prev: TEstado[][]) => {
        prev[posX][posY] = jogadorAtual;
        return [...prev];
      });

      setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');
    }
  };

  const reiniciarJogo = (tamanho: number) => {
    setTamanhoAtual(tamanho);
    setJogadorAtual('X');
    setGanhador(null);
    setGameOver(false);
    setCasas(initialCasas);
  };

  let statusJogo = `Aguardando Jogador ${jogadorAtual}`;

  if (gameOver) {
    statusJogo = ganhador ? `${ganhador} venceu o jogo!` : `Empate`;
  }

  const listaTamanhos = [];
  for (let t = 3; t <= 10; t++) {
    listaTamanhos.push(t);
  }

  return (
    <div className="flex items-center justify-center flex-col w-full h-screen gap-4">
      <span className="text-3xl">Jogo da Velha</span>
      <div
        className={`jogo grid my-grid-cols-${tamanhoAtual} items-center w-80 h-80 gap-1`}
      >
        {casas && casas.map((coluna, posY) =>
          coluna.map((_, posX) => (
            <Casa
              key={`${posX}-${posY}`}
              estado={casas[posX][posY]}
              handleClick={() => handleJogar(posX, posY)}
            />
          ))
        )}
      </div>
      <span className="text-base">{statusJogo}</span>
      {listaTamanhos.map((tamanho) => {
        return (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded"
            onClick={(e) => reiniciarJogo(tamanho)}
          >
            {`Novo Jogo ${tamanho}x${tamanho}`}
          </button>
        );
      })}
    </div>
  );
}
