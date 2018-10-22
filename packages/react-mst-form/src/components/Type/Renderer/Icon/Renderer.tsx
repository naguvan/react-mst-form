import { ReactNode } from "react";

export interface IIconRenderer {
  render(icon: string): ReactNode;
}

export default class IconRenderer implements IIconRenderer {
  public render(icon: string): ReactNode {
    return null;
  }
}
