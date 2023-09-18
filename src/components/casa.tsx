import { MouseEvent } from 'react';

export type TJogador = 'X' | 'O';

export type TEstado = TJogador | null;

type CasaProps = {
  estado: TEstado;
  handleClick: (event: MouseEvent) => void;
};

export default function Casa({ estado, handleClick }: CasaProps) {
  let classeEstado = 'estado-vazio';

  switch(estado){
    case 'X':
      classeEstado = 'estado-x';
      break; 
      case 'O':
        classeEstado = 'estado-o';
        break; 
  }

  return (
    <div
      className={`w-full h-full border-gray-400 bg-gray-300 hover:bg-gray-400 cursor-pointer select-none ${classeEstado}`}
      onClick={handleClick}
    ></div>
  );
}
