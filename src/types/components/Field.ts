import { IField, IStringField } from '../models/Field';
import { INumberField, IBooleanField } from '../models/Field';

export interface IFieldProps<T extends IField> {
    field: T;
}

export interface IFieldStates<T extends IField> {}

export interface IStringFieldProps extends IFieldProps<IStringField> {}

export interface IStringFieldStates extends IFieldStates<IStringField> {}

export interface INumberFieldProps extends IFieldProps<INumberField> {}

export interface INumberFieldStates extends IFieldStates<INumberField> {}

export interface IBooleanFieldProps extends IFieldProps<IBooleanField> {}

export interface IBooleanFieldStates extends IFieldStates<IBooleanField> {}
