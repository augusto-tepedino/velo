export type OrderStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE';

export const evaluateCreditStatus = (
  score: number,
  totalPrice: number,
  entryValue: number
): OrderStatus => {
  const entryPercentage = entryValue / totalPrice;

  // 1️⃣ Regra da Entrada Alta: SE (Entrada >= 50% do Total) E (Score < 700) → APROVADO
  if (entryPercentage >= 0.5 && score < 700) {
    return 'APROVADO';
  }
  // 2️⃣ Score Alto: SE Score > 700 → APROVADO
  if (score > 700) {
    return 'APROVADO';
  }
  // 3️⃣ Score Médio: SE Score entre 501 e 700 → EM_ANALISE
  if (score >= 501 && score <= 700) {
    return 'EM_ANALISE';
  }
  // 4️⃣ Score Baixo: SE Score <= 500 → REPROVADO
  return 'REPROVADO';
};
