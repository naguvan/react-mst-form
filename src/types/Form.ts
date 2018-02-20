import { IFieldConfig, IField, ITypeFieldConfig } from './Field';
import { ISimpleType, IComplexType } from 'mobx-state-tree';

export interface IFormConfig {
    readonly title: string;
    readonly properties: { [key: string]: IFieldConfig };
    readonly layout: Array<
        string | Array<string | Array<string | Array<string>>>
    >;
}

export interface IForm {
    // properties: Map<string, IField>;
    readonly title: string;
    readonly modified: boolean;
    readonly valid: boolean;
    readonly validating: boolean;
    readonly fields: Array<IField>;
    readonly errors: Array<string>;
    readonly values: { [key: string]: string | number | boolean };
    readonly layout: Array<
        string | Array<string | Array<string | Array<string>>>
    >;
    readonly fieldErrors: { [key: string]: Array<string> };
    get(key: string): IField | undefined;
    reset(): void;
    validate(): Promise<void>;
}
