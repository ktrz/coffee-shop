import {filter, map} from 'rxjs/operators';

export function idGenerator(): () => number {
  let generatedId = 1;
  return () => generatedId++;
}

export enum CoffeeRequestStatusValue {
  requested = 'requested',
  assigned = 'assigned',
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

export const allowStatuses = (...statuses: CoffeeRequestStatusValue[]) =>
  filter((request: CoffeeRequest) => !!statuses.find(status => status === request.status));


export const createCoffeeRequest: (id: number) => CoffeeRequest = id => ({
  id: id,
  status: CoffeeRequestStatusValue.requested,
});
