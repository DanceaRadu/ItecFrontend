import { Status } from "./Status";
import {EndpointLog} from "./EndpointLog";

export interface Endpoint {
  uid?: number;
  relativeUrl: string;
  status?: Status;
  applicationId?: number;
  log?: EndpointLog[];
  down_ratio: string,
  stable_ratio: string,
  unstable_ratio: string
}
