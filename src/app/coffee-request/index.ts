import {map} from 'rxjs/operators';

export function generateId() {
  let generatedId = 1;
  return () => generatedId++;
}

export interface CoffeeRequest {
  id: number;
}

export enum CoffeeRequestStatusValue {
  requested = 'requested',
  making = 'making',
  done = 'done',
  pickedUp = 'pickedUp',
}

export interface CoffeeRequestStatus extends CoffeeRequest {
  status: CoffeeRequestStatusValue;
}

export const setStatus = (status: CoffeeRequestStatusValue) => map((request: CoffeeRequest): CoffeeRequestStatus => ({
  ...request,
  status,
}));


export const createCoffeeRequest = id => ({
  id,
});
