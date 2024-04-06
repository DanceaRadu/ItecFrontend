import {Status} from "./Status";
import {Endpoint} from "./Endpoint";
import {IpInfo} from "./IpInfo";
import {Bug} from "./Bug";

export interface Application {
  uid: number;
  name: string;
  endpoints?: Endpoint[];
  status?: Status;
  ownerId?: number;
  baseUrl: string;
  refreshInterval?: string;
  timeToKeep?: string;
  ipInfo?: IpInfo;
  userId?: number;
  bugs?: Bug[]
}
