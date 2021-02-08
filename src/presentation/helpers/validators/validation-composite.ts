import Validation from './validation';

export default class ValidationComposite implements Validation {
  private readonly validations: Validation[];

  constructor(validations: Validation[]) {
    this.validations = validations;
  }

  validate(input: any): Error | null {
    for (let i = 0; i < this.validations.length; i += 1) {
      const error = this.validations[i].validate(input);
      if (error) return error;
    }
    return null;
  }
}
