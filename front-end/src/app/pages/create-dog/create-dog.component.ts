import { Component } from '@angular/core';

@Component({
  selector: 'app-create-dog',
  templateUrl: './create-dog.component.html',
  styleUrls: ['./create-dog.component.css'],
})
export class CreateDogComponent {
  breedList: string[] = [
    'Affenpinscher',
    'Afghan Hound',
    'Airedale Terrier',
    'Alaskan Malamute',
    'American Staffordshire Bull Terrier',
    'Anatolian Shepherd Dog',
    'Australian Cattle Dog',
    'Australian Kelpie',
    'Australian Shepherd Dog',
    'Australian Silky Terrier',
    'Australian Terrier',
    'Basenji',
    'Basset Fauve de Bretagne',
    'Basset Hound',
    'Beagle',
    'Bearded Collie',
    'Bedlington Terrier',
    'Belgian Shepherd Dog Groenendael',
    'Belgian Shepherd Dog Laekenois',
    'Belgian Shepherd Dog Malinois',
    'Belgian Shepherd Dog Tervueren',
    'Bernese Mountain Dog',
    'Bichon Frise',
    'Bloodhound',
    'Border Collie',
    'Border Terrier',
    'Borzoi',
    'Boston Terrier',
    'Bouvier des Flandres',
    'Boxer',
    'Bracco Italiano',
    'Briard',
    'Brittany',
    'Bull Terrier',
    'Bull Terrier Miniature',
    'Bulldog',
    'Bullmastiff',
    'Cairn Terrier',
    'Cavalier King Charles Spaniel',
    'Cesky Terrier',
    'Chesapeake Bay Retriever',
    'Chihuahua (Smooth Coat)',
    'Chinese Crested',
    'Chow Chow (Smooth)',
    'Clumber Spaniel',
    'Collie (Rough)',
    'Collie (Smooth)',
    'Curly-Coated Retriever',
    'Dachshund (Miniature Long Haired)',
    'Dachshund (Miniature Smooth Haired)',
    'Dachshund (Miniature Wire Haired)',
    'Dachshund (Smooth Haired)',
    'Dachshund (Wire Haired)',
    'Dalmatian',
    'Dandie Dinmont Terrier',
    'Deerhound',
    'Dobermann',
    'Dogue de Bordeaux',
    'English Setter',
    'English Springer Spaniel',
    'English Toy Terrier (Black & Tan)',
    'Field Spaniel',
    'Finnish Lapphund',
    'Finnish Spitz',
    'Flat-Coated Retriever',
    'Fox Terrier Smooth Coat',
    'Fox Terrier Wire Coat',
    'Foxhound',
    'French Bulldog',
    'German Shepherd Dog',
    'German Short-Haired Pointer',
    'German Spitz Klein',
    'German Wire-Haired Pointer',
    'Golden Retriever',
    'Gordon Setter',
    'Great Dane',
    'Greyhound',
    'Harrier Hound',
    'Hungarian Vizsla',
    'Hungarian Wire-Haired Vizsla',
    'Ibizan Hound',
    'Irish Setter',
    'Irish Terrier',
    'Irish Water Spaniel',
    'Irish Wolfhound',
    'Italian Greyhound',
    'Japanese Akita',
    'Japanese Chin',
    'Japanese Spitz',
    'Keeshond',
    'Kerry Blue Terrier',
    'King Charles Spaniel',
    'Labrador Retriever',
    'Lakeland Terrier',
    'Leonberger',
    'Lhaso Apso',
    'Lowchen',
    'Maltese',
    'Manchester Terrier',
    'Maremma Sheepdog',
    'Mastiff',
    'Newfoundland',
    'Norfolk Terrier',
    'Norwich Terrier',
    'Nova Scotia Duck Tolling Retriever',
    'Old English Sheepdog',
    'Papillon',
    'Parson Jack Russell Terrier',
    'Pharaoh Hound',
    'Pointer',
    'Pomeranian',
    'Poodle Miniature',
    'Poodle Standard',
    'Poodle Toy',
    'Portuguese Water Dog',
    'Pug',
    'Pyrenean Mountain Dog',
    'Rhodesian Ridgeback',
    'Rottweiler',
    'Saluki',
    'Samoyed',
    'Schipperke',
    'Schnauzer Giant',
    'Schnauzer Miniature',
    'Schnauzer Standard',
    'Scottish Terrier',
    'Shar Pei',
    'Shetland Sheepdog',
    'Shih Tzu',
    'Siberian Husky',
    'Skye Terrier',
    'Sloughi',
    'Soft Coated Wheaten Terrier',
    'St Bernard',
    'Sussex Spaniel',
    'Swedish Vallhund',
    'Tenterfield Terrier',
    'Tibetan Mastiff',
    'Tibetan Spaniel',
    'Tibetan Terrier',
    'Weimaraner',
    'Welsh Corgi (Cardigan)',
    'Welsh Corgi (Pembroke)',
    'Welsh Springer Spaniel',
    'Welsh Terrier',
    'West Highland White Terrier',
    'Whippet',
    'Yorkshire Terrier',
    'Unknown',
    'Others',
  ];
}