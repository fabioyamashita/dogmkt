import DogCartDetailed from './dogCartDetailed';

export default class CartDetailed {
  id?: number;
  userId?: number;
  summary: number;
  discount: number;
  total: number;
  dogs: DogCartDetailed[];

  constructor(
    userId: number = 0,
    summary: number = 0,
    discout: number = 0,
    total: number = 0,
    dogs: DogCartDetailed[] = []
  ) {
    this.userId = userId;
    this.summary = summary;
    this.discount = discout;
    this.total = total;
    this.dogs = dogs;
  }
}
