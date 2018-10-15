import { IModelType, types } from "mobx-state-tree";

import { ILayout } from "reactive-json-schema";

export interface ISectionConfig {
  readonly title: string;
  readonly layout: ILayout;
  readonly selected?: boolean;
}

export interface ISection {
  readonly title: string;
  readonly layout: ILayout;
  readonly selected: boolean;
  makeSelection(selected: boolean): void;
}

const Section: IModelType<Partial<ISectionConfig>, ISection> = types
  .model("Section", {
    layout: types.frozen,
    selected: types.optional(types.boolean, false),
    title: types.string
  })
  .actions(it => ({
    makeSelection(selected: boolean): void {
      it.selected = selected;
    }
  }));

export default Section;
