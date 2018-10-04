import { IComplexType as IMobxType, types } from "mobx-state-tree";

import { IArray, IArrayConfig } from "../Array";
import { IBoolean, IBooleanConfig } from "../Boolean";
import { INull, INullConfig } from "../Null";
import { INumber, INumberConfig } from "../Number";
import { IObject, IObjectConfig } from "../Object";
import { IString, IStringConfig } from "../String";

export type ITypeConfig =
  | IStringConfig
  | INumberConfig
  | IBooleanConfig
  | INullConfig
  | IObjectConfig
  | IArrayConfig;

export type IType = IString | INumber | IBoolean | INull | IObject | IArray;

let Type: IMobxType<Partial<ITypeConfig>, IType>;

import { mappings } from "../Common";

export default function createType(): IMobxType<Partial<ITypeConfig>, IType> {
  if (!Type) {
    Type = types.union(
      snapshot =>
        snapshot && typeof snapshot === "object" && "type" in snapshot
          ? mappings[snapshot.type]
          : mappings.null,
      mappings.string,
      mappings.number,
      mappings.boolean,
      mappings.null,
      mappings.object,
      mappings.array
    );
  }
  return Type;
}

// Required for Mapping to work

import "../String";

import "../Number";

import "../Boolean";

import "../Null";

import "../Object";

import "../Array";
