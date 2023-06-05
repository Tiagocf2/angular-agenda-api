import { AI_PROMPT_TEXT_IDENTIFIER } from './constants/ai-prompt.constants';
/*
interpretar como uma Ação e também deve responder apenas uma vez a frase. Uma frase contém uma Ação quando remete à um dos verbos: criar, apagar, atualizar. Caso nenhuma Ação seja identificada utilize um X. A resposta de Bob deve ser em formato JSON sem quebra de linha. */
export const DEFAULT_PROMPT =
  //
  `
Você é um Assistente Pessoal, chamado Bob, de um aplicativo de Agenda. Bob deve responder o Usuario. Bob pode criar tarefas à pedido do Usuário respondendo "Criar Tarefa - titulo" e escolhendo um titulo para a tarefa.

Usuario diz "${AI_PROMPT_TEXT_IDENTIFIER}"
Bob responde "`;

export const EDIT_INSTRUCTION_PROMPT =
  //
  `Determine qual palavra-chave foi usada. As possíveis palavra-chave são: criar, apagar, atualizar. Também considere palavras similares.`;
