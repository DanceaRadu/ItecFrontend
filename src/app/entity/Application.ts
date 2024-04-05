import {Status} from "./Status";
import {Endpoint} from "./Endpoint";

export interface Application {
  id: number;
  name: string;
  endpoints: Endpoint[];
  status: Status;
  ownerId?: number;
  baseBath: string;
}
