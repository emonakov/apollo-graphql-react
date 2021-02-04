import { ErrorInterface } from './ErrorInterface';

export interface StateInterface {
  loading?: boolean;
  error?: ErrorInterface;
  items?: string[];
  loggedIn: boolean;
}
