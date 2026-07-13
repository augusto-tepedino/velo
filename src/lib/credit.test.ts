import { describe, it, expect } from 'vitest';
import { evaluateCreditStatus } from './credit';

describe('evaluateCreditStatus', () => {
  const totalPrice = 100000;

  it('should return APROVADO if score is > 700 regardless of entry', () => {
    expect(evaluateCreditStatus(750, totalPrice, 0)).toBe('APROVADO');
    expect(evaluateCreditStatus(800, totalPrice, 10000)).toBe('APROVADO');
  });

  it('should return APROVADO if entry >= 50% and score < 700', () => {
    // 50% entry, low score
    expect(evaluateCreditStatus(600, totalPrice, 50000)).toBe('APROVADO');
    // 60% entry, very low score
    expect(evaluateCreditStatus(400, totalPrice, 60000)).toBe('APROVADO');
  });

  it('should return EM_ANALISE if score is between 501 and 700 with entry < 50%', () => {
    // entry < 50%
    expect(evaluateCreditStatus(600, totalPrice, 20000)).toBe('EM_ANALISE');
    expect(evaluateCreditStatus(501, totalPrice, 49999)).toBe('EM_ANALISE');
    expect(evaluateCreditStatus(700, totalPrice, 0)).toBe('EM_ANALISE');
  });

  it('should return REPROVADO if score <= 500 with entry < 50%', () => {
    expect(evaluateCreditStatus(500, totalPrice, 20000)).toBe('REPROVADO');
    expect(evaluateCreditStatus(300, totalPrice, 49999)).toBe('REPROVADO');
  });
});
