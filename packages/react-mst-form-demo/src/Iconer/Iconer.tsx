import * as React from "react";

import { ReactNode } from "react";

import { IIconRenderer } from "react-mst-form";

import AccountBalance from "@material-ui/icons/AccountBalanceSharp";
import Assignment from "@material-ui/icons/AssignmentSharp";
import Build from "@material-ui/icons/BuildSharp";
import DateRange from "@material-ui/icons/DateRangeSharp";
import Face from "@material-ui/icons/FaceSharp";

export default class IconRenderer implements IIconRenderer {
  private static icons: { [key: string]: ReactNode } = {
    "account-balance": <AccountBalance />,
    assignment: <Assignment />,
    build: <Build />,
    "date-range": <DateRange />,
    face: <Face />
  };

  public render(icon: string): ReactNode {
    return IconRenderer.icons[icon] || icon;
  }
}
