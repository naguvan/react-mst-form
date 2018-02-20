import { IFieldConfig, IField, ITypeFieldConfig } from './Field';
import { ISimpleType, IComplexType } from 'mobx-state-tree';

export interface IFormConfig {
    // properties: IComplexType<{ [key: string]: Partial<IFieldConfig> }, any>;
    // layout: Array<
    //     keyof IFormConfig['properties'] // | Array<keyof IFormConfig['properties']>
    // >;
    properties: { [key: string]: Partial<IFieldConfig> };
    layout: Array<string | Array<string | Array<string | Array<string>>>>;
}

export interface IForm {
    // properties: Map<string, IField>;
    fields: Array<IField>;
    values: { [key: string]: string | number | boolean };
    layout: Array<string | Array<string | Array<string | Array<string>>>>;
    // values: IComplexType<
    //     {
    //         [K in keyof IForm['properties']]: ISimpleType<
    //             IForm['properties'][K]['value']
    //         >
    //     },
    //     any
    // >;

    get(key: string): IField | undefined;
}
