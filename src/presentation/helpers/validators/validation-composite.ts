import Validation from '../../protocols/validation';

export default class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  validate(input: any): Error | null {
    for (let i = 0; i < this.validations.length; i += 1) {
      const error = this.validations[i].validate(input);
      if (error) return error;
    }
    return null;
  }
}
