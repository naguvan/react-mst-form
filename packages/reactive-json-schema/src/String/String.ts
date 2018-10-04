import { IModelType, types } from "mobx-state-tree";

import { regex } from "../utils";

import { mappings } from "../Common";
import { matchers } from "./matchers";

import { createValue, IValue, IValueAttrs, IValueConfig } from "../Value";

export type IFormat =
  | "date"
  | "date-time"
  | "uri"
  | "uri-reference"
  | "uri-template"
  | "url"
  | "email"
  | "hostname"
  | "ipv4"
  | "ipv6"
  | "regex"
  | "uuid"
  | "json-pointer"
  | "json-pointer-uri-fragment"
  | "relative-json-pointer"
  | "alpha"
  | "alphanumeric"
  | "identifier"
  | "hexadecimal"
  | "numeric"
  | "time"
  | "color"
  | "host-name"
  | "style"
  | "phone"
  | "ip-address"
  | "uppercase"
  | "lowercase"
  | "utc-millisec"
  | null;

export interface IStringAttrs extends IValueAttrs<string> {
  readonly minLength?: number | null;
  readonly maxLength?: number | null;
  readonly pattern?: string | null;
  readonly format?: IFormat | null;
}

export interface IStringConfig
  extends IValueConfig<string, "string">,
    Partial<IStringAttrs> {}

export interface IString extends IStringAttrs, IValue<string, "string"> {}

// tslint:disable-next-line:variable-name
export const String: IModelType<Partial<IStringConfig>, IString> = types
  .compose(
    "String",
    createValue<string, "string">("string", types.string, ""),
    types.model({
      format: types.maybe(
        types.union(
          ...Object.keys(matchers).map(format => types.literal(format))
        )
      ),
      maxLength: types.maybe(types.number),
      minLength: types.maybe(types.number),
      pattern: types.maybe(types.string)
    })
  )
  .actions(it => ({
    afterCreate() {
      if (it.pattern != null && !regex(it.pattern)) {
        throw new TypeError(`pattern '${it.pattern}' is invalid.`);
      }
    }
  }))
  .actions(it => ({
    syncValidate(value: string): string[] {
      const errors: string[] = it.syncValidateBase(value);
      if (it.minLength !== null && value.length < it.minLength) {
        errors.push(`should NOT be shorter than ${it.minLength} characters`);
      }
      if (it.maxLength !== null && value.length > it.maxLength) {
        errors.push(`should NOT be longer than ${it.maxLength} characters`);
      }
      if (it.pattern !== null && !value.match(regex(it.pattern)!)) {
        errors.push(`should match pattern ${it.pattern}`);
      }
      if (it.format != null && !matchers[it.format](value)) {
        errors.push(`should match format ${it.format}`);
      }
      return errors;
    }
  }));

mappings.string = String;

export function createString(): IModelType<Partial<IStringConfig>, IString> {
  return String;
}
