import { Status } from "./Status";
import {EndpointLog} from "./EndpointLog";

export interface Endpoint {
  uid?: number;
  relativeUrl: string;
  status?: Status;
  applicationId?: number;
  log?: EndpointLog[];
  down_ratio: number,
  stable_ratio: number,
  unstable_ratio: number
}
