import { IPDATA } from "./map.d";
import React from "react";

export interface IHOME {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleQuery: (key: string) => void;
  data: IPDATA;
}
