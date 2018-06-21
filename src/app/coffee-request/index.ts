import {map} from 'rxjs/operators';

export function generateId() {
  let generatedId = 1;
  return () => generatedId++;
}

export interface CoffeeRequest {
  id: number;
}

export interface CoffeeRequestStatus extends CoffeeRequest {
  status: 'requested' | 'making' | 'done' | 'pickedUp';
}

export const addStatus = status => map((request: CoffeeRequest): CoffeeRequestStatus => ({
  ...request,
  status,
}));


export const createCoffeeRequest = id => ({
  id,
});
