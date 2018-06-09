import * as utils from '../src/utils';

describe('alternateFirstInvocation', () => {

  it('initially yields the invocation of the first argument', () => {
    const generator = utils.alternateFirstInvocation(() => 1, () => 2);
    const result = generator.next().value;
    expect(result).toBe(1);
  });

  it('subsequently yields the invocation of the second argument', () => {
    const generator = utils.alternateFirstInvocation(() => 1, () => 2);
    generator.next();
    const result = generator.next().value;
    expect(result).toBe(2);
  });

  it('subsequently yields the invocation of the second argument ad infinitum', () => {
    const generator = utils.alternateFirstInvocation(() => 1, () => 2);
    for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
      generator.next();
    }
    const result = generator.next().value;
    expect(result).toBe(2);
  });
});
