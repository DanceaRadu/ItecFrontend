import {Status} from "./Status";
import {Endpoint} from "./Endpoint";

export interface Application {
  id: number;
  name: string;
  endpoints: Endpoint[];
  status: Status;
  ownerId?: number;
  baseUrl: string;
  refreshInterval: string;
  timeToKeep: string;
}
