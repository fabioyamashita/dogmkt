import DogCart from './dogCart';

export default class Cart {
  id?: number;
  userId?: number;
  summary: number;
  discount: number;
  total: number;
  dogs: DogCart[];

  constructor(
    userId: number = 0,
    summary: number = 0,
    discout: number = 0,
    total: number = 0,
    dogs: DogCart[] = []
  ) {
    this.userId = userId;
    this.summary = summary;
    this.discount = discout;
    this.total = total;
    this.dogs = dogs;
  }
}
