import Dog from 'src/app/models/dog';

export default class DogCart {
  dog: Dog;
  dogId: string;
  quantity: number;

  constructor(dog: Dog, dogId: string, quantity: number) {
    this.dog = dog;
    this.dogId = dogId;
    this.quantity = quantity;
  }
}
