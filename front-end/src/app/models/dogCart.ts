import Dog from 'src/app/models/dog';

export default class DogCart {
  dog: Dog;
  quantity: number;

  constructor(dog: Dog, quantity: number) {
    this.dog = dog;
    this.quantity = quantity;
  }
}
