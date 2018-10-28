import { ReactNode } from "react";

import { IIconRenderer } from "react-mst-form";

export default class IconRenderer implements IIconRenderer {
  public render(icon: string): ReactNode {
    return icon && icon.toUpperCase();
  }
}
