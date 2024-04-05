import {Application} from "./Application";

export interface UserProfile {
  id: number;
  keycloakId: string;
  username: string;
  addedApplications: Application[];
  developedApplications: Application[]
}
