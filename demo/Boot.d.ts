/// <reference types="react" />
import { Component, ReactNode } from "react";
import { IBootProps, IBootStates } from "./types";
export default class Boot extends Component<IBootProps, IBootStates> {
  constructor(props: IBootProps, context: {});
  render(): ReactNode;
  private getTheme(theme);
}
