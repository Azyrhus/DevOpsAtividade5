const {
  celsiusParaFahrenheit,
  fahrenheitParaCelsius,
  quilometrosParaMilhas,
  milhasParaQuilometros,
} = require('../src/conversor');

describe('Conversor de unidades', () => {
  test('converte 0 °C para 32 °F', () => {
    expect(celsiusParaFahrenheit(0)).toBe(32);
  });

  test('converte 100 °C para 212 °F', () => {
    expect(celsiusParaFahrenheit(100)).toBe(212);
  });

  test('converte 212 °F para 100 °C', () => {
    expect(fahrenheitParaCelsius(212)).toBe(100);
  });

  test('-40 °C é igual a -40 °F', () => {
    expect(celsiusParaFahrenheit(-40)).toBe(-40);
    expect(fahrenheitParaCelsius(-40)).toBe(-40);
  });

  test('converte 10 km para milhas', () => {
    expect(quilometrosParaMilhas(10)).toBeCloseTo(6.2137, 3);
  });

  test('converte 1 milha para quilômetros', () => {
    expect(milhasParaQuilometros(1)).toBeCloseTo(1.609344, 6);
  });

  test('lança erro quando o valor não é número', () => {
    expect(() => celsiusParaFahrenheit('10')).toThrow('O valor deve ser um número');
    expect(() => quilometrosParaMilhas(NaN)).toThrow('O valor deve ser um número');
  });
});
