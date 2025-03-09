import type { Endpoint } from "../../lib/rest-api/dto.ts";

export type Create = Endpoint<{
  folderName: string;
  parent?: string;
}, {
  status: "success";
  data: {
    id: string;
    name: string;
    images: unknown[];
    folders: unknown[];
    modificationTime: number;
    imagesMappings: unknown;
    tags: string[];
    isExpand: boolean;
  };
}>;

type Entry = {
  id: string;
  name: string;
  description?: string;
  images: unknown[];
  folders: unknown[];
  modificationTime: number;
  imagesMappings: unknown;
  tags: string[];
  isExpand: boolean;
  size: number;
  vstype: string;
  guidelines: string[];
  styles: Record<string, unknown>;
  isVisible: boolean;
  index: number;
  $$hashKey: string;
  newFolderName: string;
  parent: string;
  imageCount: number;
  depth: number;
  descendantImageCount: number;
  pinyin: string;
  extendtags: string[];
  covers: string[];
  editable?: boolean;
  children: Entry[];
};

export type Rename = Endpoint<{
  folderId: string;
  newName: string;
}, {
  status: "success";
  data: Entry;
}>;

export type Update = Endpoint<{
  folderId: string;
  newName?: string;
  newDescription?: string;
  newColor?: string;
}, {
  status: "success";
  data: Entry;
}>;

type TopLevelListEntry = {
  // Top level of the LIST result is not so much detailed
  id: string;
  name: string;
  description?: string;
  modificationTime: number;
  tags: string[];
  imageCount: number;
  descendantImageCount: number;
  pinyin: string;
  extendtags: string[];
  children: Entry[];
};

export type List = Endpoint<never, {
  status: "success";
  data: TopLevelListEntry[];
}>;

export type ListRecent = Endpoint<never, {
  status: "success";
  data: TopLevelListEntry[];
}>;

// suppose the library has n-point complete binary tree of folders
// the top level array has n elements (nodes)
// each element has the following number of children:
// the maximum depths of the subtree,
// where the depth of each node is calculated considering that node as the root.
// thus total of children is
// $ n + 2^{\lfloor \log_2(n+1) \rfloor} - \lfloor \log_2(n+1) \rfloor - 1 $
// thus the result of LIST is O(n). fine;)
