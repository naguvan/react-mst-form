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
    readonly minLength?: number;
    readonly maxLength?: number;
    readonly pattern?: string;
    readonly format?: IFormat;
}

export interface IStringConfig
    extends IValueConfig<string, 'string'>,
        Partial<IStringAttrs> {}

export interface IString extends IStringAttrs, IValue<string, 'string'> {}
