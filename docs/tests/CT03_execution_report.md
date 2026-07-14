# Relatório de Execução - CT03

## Objetivo
O objetivo da execução foi validar o **CT03 - Configuração do Veículo (Adição de Opcionais) e Cálculo de Preço**. 
Este caso de teste verifica se a seleção dos opcionais "Precision Park" e "Flux Capacitor" atualiza corretamente e de forma dinâmica o preço do veículo, bem como se os valores são persistidos corretamente no redirecionamento para o Checkout.

## Pré-Condições
- O sistema e o configurador de veículos estão acessíveis e funcionais.
- O preço base inicial do veículo está configurado para R$ 40.000,00.

## Passos Executados Automatizadamente
O teste simulou o comportamento de um usuário da seguinte maneira (conforme especificado em `docs/tests/test-cases.md`):

1. **Acesso ao configurador:** Verificado o carregamento do configurador com preço inicial de R$ 40.000,00.
2. **Seleção do Opcional 1:** Marcado o checkbox "Precision Park". O preço validado atualizou para R$ 45.500,00 (+ R$ 5.500,00).
3. **Seleção do Opcional 2:** Marcado o checkbox "Flux Capacitor". O preço validado atualizou para R$ 50.500,00 (+ R$ 5.000,00).
   - *Captura de tela (Evidência 1): `docs/tests/CT03_evidence_1.png` gerada neste ponto contendo os opcionais marcados.*
4. **Remoção de Opcionais:** Desmarcados os dois checkboxes ("Precision Park" e "Flux Capacitor"). O preço retornou para R$ 40.000,00, validando a subtração correta.
5. **Avanço para Checkout:** O botão de finalização ("Monte o Seu") foi acionado.
6. **Validação no Checkout:** Validado o carregamento da página de checkout (`/order`) e a persistência do preço esperado no resumo do pedido (R$ 40.000,00).
   - *Captura de tela (Evidência 2): `docs/tests/CT03_evidence_2.png` gerada no final para comprovar a conclusão e persistência dos dados.*

## Resultados e Evidências
O teste foi executado via Playwright. O fluxo ocorreu conforme o esperado, com as atualizações de valores sendo refletidas de forma instantânea na interface e corretamente transportadas ao final do processo.

As evidências fotográficas em formato `.png` podem ser conferidas nos arquivos:
- `docs/tests/CT03_evidence_1.png` (Comprova adição de valores no configurador)
- `docs/tests/CT03_evidence_2.png` (Comprova redirecionamento com valor correto para checkout)
