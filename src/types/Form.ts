import { IFieldConfig, IField, ITypeFieldConfig } from './Field';
import { ISimpleType, IComplexType } from 'mobx-state-tree';

export interface IFormConfig {
    properties: { [key: string]: IFieldConfig };
    layout: Array<string | Array<string | Array<string | Array<string>>>>;
}

export interface IForm {
    // properties: Map<string, IField>;
    fields: Array<IField>;
    values: { [key: string]: string | number | boolean };
    layout: Array<string | Array<string | Array<string | Array<string>>>>;
    get(key: string): IField | undefined;
}
