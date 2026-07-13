import { describe, it, expect } from 'vitest'
import { isValidCpf, isValidEmailStrict } from './validators'

describe('validators', () => {
  describe('isValidCpf', () => {
    it('should return true for valid CPFs', () => {
      expect(isValidCpf('52998224725')).toBe(true)
      expect(isValidCpf('123.456.789-09')).toBe(true)
    })

    it('should return false for invalid CPFs', () => {
      expect(isValidCpf('12345678900')).toBe(false)
      expect(isValidCpf('111.111.111-11')).toBe(false) // repeated digits
      expect(isValidCpf('123')).toBe(false) // too short
    })
  })

  describe('isValidEmailStrict', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmailStrict('user@example.com')).toBe(true)
      expect(isValidEmailStrict('first.last@domain.co.uk')).toBe(true)
    })

    it('should return false for invalid emails', () => {
      expect(isValidEmailStrict('user@.com')).toBe(false)
      expect(isValidEmailStrict('user@example..com')).toBe(false)
      expect(isValidEmailStrict('user@example')).toBe(false)
      expect(isValidEmailStrict('user example.com')).toBe(false)

    })
  })
})
