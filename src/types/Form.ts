import { IFieldConfig, IField, ITypeFieldConfig } from './Field';
import { ISimpleType, IComplexType } from 'mobx-state-tree';

export interface IFormConfig {
    properties: { [key: string]: Partial<ITypeFieldConfig<any, any>> };
    layout: Array<
        keyof IFormConfig['properties'] // | Array<keyof IFormConfig['properties']>
    >;
}

export interface IForm extends IFormConfig {
    fields: Array<IField>;
    values: {
        [K in keyof IForm['properties']]: ISimpleType<IForm['properties'][K]['value']>
    };
}
