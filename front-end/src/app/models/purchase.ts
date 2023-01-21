import DogCart from './dogCart';

export default class Purchase {
  id?: number;
  userId?: number;
  summary?: number;
  discount?: number;
  total?: number;
  dogs?: DogCart[];
  date?: string = new Date().toISOString().slice(0, 10);

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
