import DogCart from './dogCart';

export default class Cart {
  id: string = new Date().getTime().toString();
  summary: number;
  discount: number;
  total: number;
  dogs: DogCart[];

  constructor(
    summary: number = 0,
    discout: number = 0,
    total: number = 0,
    dogs: DogCart[] = []
  ) {
    this.summary = summary;
    this.discount = discout;
    this.total = total;
    this.dogs = dogs;
  }
}
