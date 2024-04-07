import {Status} from "./Status";

export interface EndpointLog {
  uid?: number;
  endpointId?: number;
  responseTime?: number;
  status?: Status;
  timestamp?: Date;
}
