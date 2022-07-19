import { NextPage } from "next";
import React from "react";

export type PageWithLayout = {
  layout?: React.FC<{ children: React.ReactNode }>;
};
