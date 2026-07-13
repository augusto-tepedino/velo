import { describe, it, expect } from 'vitest';
import {
  calculateTotalPrice,
  calculateInstallment,
  formatPrice,
  CarConfiguration
} from './configuratorStore';

describe('configuratorStore pure functions', () => {
  describe('calculateTotalPrice', () => {
    it('should calculate base price correctly', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: [],
      };
      // Base price is 40000
      expect(calculateTotalPrice(config)).toBe(40000);
    });

    it('should add sport wheels price correctly', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'sport',
        optionals: [],
      };
      // Base price 40000 + 2000 (sport wheels)
      expect(calculateTotalPrice(config)).toBe(42000);
    });

    it('should add optional features prices correctly', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: ['precision-park', 'flux-capacitor'],
      };
      expect(calculateTotalPrice(config)).toBe(50500);
    });
  });

  describe('calculateInstallment', () => {
    it('should calculate installment value with 2% compound interest over 12 months', () => {
      const installment = calculateInstallment(40000);
      expect(installment).toBe(3782.38);
    });
  });

  describe('formatPrice', () => {
    it('should format numbers to BRL currency correctly', () => {
      const formatted = formatPrice(40000);
      const normalized = formatted.replace(/\u00A0/g, ' ').replace(/\s/g, ' ');
      expect(normalized).toMatch(/R\$\s?40\.000,00/);
    });
  });
});
