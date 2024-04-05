import { Status } from "./Status";

export interface Endpoint {
  id: number;
  relativeUrl: string;
  status: Status;
}
