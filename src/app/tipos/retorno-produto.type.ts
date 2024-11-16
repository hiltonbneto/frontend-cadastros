import { RetornoCategoria } from './retorno-categoria.type';

export type RetornoProduto = {
  id: bigint;
  descricao: string;
  categoria: RetornoCategoria;
};
