import { ActionM } from './action';
import { Request } from './request';

/**
 * Filter functions are applied to the request.
 * 
 * These can either transform the request or terminate.
 */
export type Filter<A> = (r: Request) => ActionM<A>;

/**
 * ErrorFilter functions are applied to a request when it triggers an error.
 */
export type ErrorFilter = (e: Error, r: Request) => ActionM<void>;
