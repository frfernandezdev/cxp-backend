import { EnumValueObject } from '../value-object/EnumValueObject';
import { InvalidArgumentError } from '../value-object/InvalidArgumentError';

export enum Operator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GT = '>',
  LT = '<',
  GOET = '>=',
  LOET = '<=',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  LIKE = 'LIKE',
  NOT_LIKE = 'NOT_LIKE',
  ILIKE = 'ILIKE',
  NOT_ILIKE = 'NOT_ILIKE',
  BETWEEN = 'BETWEEN',
  NOT_BETWEEN = 'NOT_BETWEEN',
}

export class FilterOperator extends EnumValueObject<Operator> {
  constructor(value: Operator) {
    super(value, Object.values(Operator));
  }

  static fromValue(value: string): FilterOperator {
    switch (value) {
      case Operator.EQUAL:
        return new FilterOperator(Operator.EQUAL);
      case Operator.NOT_EQUAL:
        return new FilterOperator(Operator.NOT_EQUAL);
      case Operator.GT:
        return new FilterOperator(Operator.GT);
      case Operator.LT:
        return new FilterOperator(Operator.LT);
      case Operator.GOET:
        return new FilterOperator(Operator.GOET);
      case Operator.LOET:
        return new FilterOperator(Operator.LOET);
      case Operator.CONTAINS:
        return new FilterOperator(Operator.CONTAINS);
      case Operator.NOT_CONTAINS:
        return new FilterOperator(Operator.NOT_CONTAINS);
      case Operator.LIKE:
        return new FilterOperator(Operator.LIKE);
      case Operator.NOT_LIKE:
        return new FilterOperator(Operator.NOT_LIKE);
      case Operator.ILIKE:
        return new FilterOperator(Operator.ILIKE);
      case Operator.NOT_ILIKE:
        return new FilterOperator(Operator.NOT_ILIKE);
      case Operator.BETWEEN:
        return new FilterOperator(Operator.BETWEEN);
      case Operator.NOT_BETWEEN:
        return new FilterOperator(Operator.NOT_BETWEEN);
      default:
        throw new InvalidArgumentError(
          `The filter operator ${value} is invalid`,
        );
    }
  }

  public isPositive(): boolean {
    return (
      this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS
    );
  }

  protected throwErrorForInvalidValue(value: Operator): void {
    throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
  }

  static equal() {
    return this.fromValue(Operator.EQUAL);
  }
}
