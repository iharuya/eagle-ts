import type { Endpoint } from "../../lib/rest-api/dto.ts";

type BaseItem = {
  id: string;
  name: string;
  size: number;
  btime: number;
  mtime: number;
  ext: string;
  tags: string[];
  folders: string[];
  isDeleted: boolean;
  url: string;
  annotation: string;
  modificationTime: number;
  star?: number;
  lastModified?: number;
};
type ImageItem = BaseItem & {
  width: number;
  height: number;
  palettes: {
    color: [number, number, number];
    ratio: number;
    $$hashKey: string;
  }[];
};
type TextItem = BaseItem & {
  text: string;
};

// more media specific properties should be added
type Item = ImageItem | TextItem | BaseItem;

export type AddFromURL = Endpoint<{
  url: string;
  name: string;
  website?: string;
  tags?: string[];
  star?: number;
  annotation?: string;
  modificationTime?: number;
  folderId?: string;
  headers?: Record<string, string>;
}, {
  status: "success";
}>;

export type AddFromURLs = Endpoint<{
  items: {
    url: string;
    name: string;
    website?: string;
    tags?: string[];
    annotation?: string;
    modificationTime?: number;
    headers?: Record<string, string>;
  }[];
  folderId?: string;
}, {
  status: "success";
}>;

export type AddFromPath = Endpoint<{
  path: string;
  name: string;
  website?: string;
  annotation?: string;
  tags?: string[];
  folderId?: string;
}, {
  status: "success";
}>;

export type AddFromPaths = Endpoint<{
  items: {
    path: string;
    name: string;
    website?: string;
    annotation?: string;
    tags?: string[];
  }[];
  folderId?: string;
}, {
  status: "success";
}>;

export type AddBookmark = Endpoint<{
  url: string;
  name: string;
  base64?: string;
  tags?: string[];
  modificationTime?: number;
  folderId?: string;
}, {
  status: "success";
}>;

export type Info = Endpoint<{
  id: string;
}, {
  status: "success";
  data: Item;
}>;

export type Thumbnail = Endpoint<{
  id: string;
}, {
  status: "success";
  data: string;
}>;

type OrderBy =
  | "CREATEDATE"
  | "-CREATEDATE"
  | "FILESIZE"
  | "-FILESIZE"
  | "NAME"
  | "-NAME"
  | "RESOLUTION"
  | "-RESOLUTION";
export type List = Endpoint<{
  limit?: number;
  offset?: number;
  orderBy?: OrderBy;
  keyword?: string;
  ext?: string;
  tags?: string;
  folders?: string;
}, {
  status: "success";
  data: Item[];
}>;

export type MoveToTrash = Endpoint<{
  itemIds: string[];
}, {
  status: "success";
}>;

export type RefreshPalette = Endpoint<{
  id: string;
}, {
  status: "success";
}>;

export type RefreshThumbnail = Endpoint<{
  id: string;
}, {
  status: "success";
}>;

export type Update = Endpoint<{
  id: string;
  tags?: string[];
  annotation?: string;
  url?: string;
  star?: number;
}, {
  status: "success";
  data: Item;
}>;
