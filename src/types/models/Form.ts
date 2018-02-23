import { ITypeConfig, IType } from './Type';
import { ISimpleType, IComplexType } from 'mobx-state-tree';

export type IFormLayout = Array<
    string | Array<string | Array<string | Array<string>>>
>;

export interface IFormSection {
    title: string;
    layout: IFormLayout;
}

export interface IFormConfig {
    readonly title: string;
    readonly properties: { [key: string]: ITypeConfig };
    readonly layout?: IFormLayout;
    readonly sections?: Array<IFormSection>;
}

export interface IForm {
    // properties: Map<string, IType>;
    readonly title: string;
    readonly modified: boolean;
    readonly valid: boolean;
    readonly validating: boolean;
    readonly fields: Array<IType>;
    readonly errors: Array<string>;
    readonly values: { [key: string]: any };
    readonly layout: IFormLayout;
    readonly sections: Array<IFormSection>;
    readonly fieldErrors: { [key: string]: Array<string> };
    get(key: string): IType | undefined;
    reset(): void;
    validate(): Promise<void>;
}
