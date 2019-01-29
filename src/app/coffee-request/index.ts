import {map} from 'rxjs/operators';

export function generateId(): () => number {
  let generatedId = 1;
  return () => generatedId++;
}

export enum CoffeeRequestStatusValue {
  requested = 'requested',
  making = 'making',
  done = 'done',
  pickedUp = 'pickedUp',
}

export interface CoffeeRequest {
  id: number;
  status: CoffeeRequestStatusValue;
}

export const setStatus = (status: CoffeeRequestStatusValue) => map((request: CoffeeRequest): CoffeeRequest => ({
  ...request,
  status,
}));


export const createCoffeeRequest = id => ({
  id,
});
