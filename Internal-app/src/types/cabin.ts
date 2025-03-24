export type Cabin = {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
};

export type CabinEdit = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
};
