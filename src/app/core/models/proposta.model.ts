export interface PropostaResponse {
  id: string;
  nome: string;
  sobreNome: string;
  telefone: string;
  cpf: string;
  renda: number;
  valorSolicitadoFmt: string;
  prazoPagamento: number;
  aprovada: boolean;
  observacao: string;
  integrada: boolean;
}
