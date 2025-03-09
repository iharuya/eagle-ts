import type { Endpoint } from "../../lib/rest-api/dto.ts";

export type Info = Endpoint<never, {
  status: "success";
  data: {
    version: string;
    prereleaseVersion: string | null;
    buildVersion: string;
    execPath: string;
    platform: string;
  };
}>;
