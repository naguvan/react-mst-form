import { IValue, IValueAttrs, IValueConfig } from './Value';

export type IFormat =
    | 'date'
    | 'date-time'
    | 'uri'
    | 'uri-reference'
    | 'uri-template'
    | 'url'
    | 'email'
    | 'hostname'
    | 'ipv4'
    | 'ipv6'
    | 'regex'
    | 'uuid'
    | 'json-pointer'
    | 'json-pointer-uri-fragment'
    | 'relative-json-pointer'
    | 'alpha'
    | 'alphanumeric'
    | 'identifier'
    | 'hexadecimal'
    | 'numeric'
    | 'time'
    | 'color'
    | 'host-name'
    | 'style'
    | 'phone'
    | 'ip-address'
    | 'uppercase'
    | 'lowercase'
    | 'utc-millisec'
    | null;

export interface IStringAttrs extends IValueAttrs<string> {
    readonly minLength?: number | null;
    readonly maxLength?: number | null;
    readonly pattern?: string | null;
    readonly format?: IFormat | null;
}

export interface IStringConfig
    extends IValueConfig<string, 'string'>,
        Partial<IStringAttrs> {}

export interface IString extends IStringAttrs, IValue<string, 'string'> {}
