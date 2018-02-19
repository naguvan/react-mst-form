import { IFieldConfig, IField, ITypeFieldConfig } from './Field';
import { ISimpleType, IComplexType } from 'mobx-state-tree';

export interface IFormConfig {
    properties: IComplexType<{ [key: string]: Partial<IFieldConfig> }, any>;
    layout: Array<
        keyof IFormConfig['properties'] // | Array<keyof IFormConfig['properties']>
    >;
}

export interface IForm extends IFormConfig {
    // fields: Array<IField>;
    values: IComplexType<{
        [K in keyof IForm['properties']]: ISimpleType<IForm['properties'][K]['value']>
    }, any>;
}
