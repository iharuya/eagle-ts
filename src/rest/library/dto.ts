import type { Endpoint } from "../../lib/rest-api/dto.ts";

type Folder = {
  id: string;
  name: string;
  description: string;
  children: Folder[];
  modificationTime: number;
  tags: string[];
  iconColor?: string;
  icon?: string;
  password: string;
  passwordTips: string;
  coverId?: string;
  orderBy?: "MANUAL" | "FILESIZE" | "RATING";
  sortIncrease?: boolean;
};

type SmartFolder = {
  id: string;
  icon?: string;
  name: string;
  description: string;
  modificationTime: number;
  conditions: unknown[];
  orderBy?: "MANUAL" | "FILESIZE" | "RATING";
  sortIncrease?: boolean;
};

type QuickAccessItem = {
  type: string;
  id: string;
};

type TagsGroup = {
  id: string;
  name: string;
  tags: string[];
  color?: string;
};

export type Info = Endpoint<never, {
  status: "success";
  data: {
    folders: Folder[];
    smartFolders: SmartFolder[];
    quickAccess: QuickAccessItem[];
    tagsGroups: TagsGroup[];
    modificationTime: number;
    applicationVersion: string;
    library: {
      path: string;
      name: string;
    };
  };
}>;

export type History = Endpoint<never, {
  status: "success";
  data: string[];
}>;

export type Switch = Endpoint<{
  libraryPath: string;
}, {
  status: "success";
}>;

type IconResponse = {
  status: "success";
  dataURI: string;
} | {
  status: "error";
  message: string;
};
export type Icon = Endpoint<{
  libraryPath: string;
}, IconResponse>;
