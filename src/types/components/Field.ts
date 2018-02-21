import { IForm } from '../models/Form';
import { IField, IString } from '../models/Field';
import { INumber, IBoolean } from '../models/Field';

export interface IFieldProps<T extends IField> {
    field: T;
    form: IForm;
}

export interface IFieldStates<T extends IField> {}

export interface IStringFieldProps extends IFieldProps<IString> {}

export interface IStringFieldStates extends IFieldStates<IString> {}

export interface INumberFieldProps extends IFieldProps<INumber> {}

export interface INumberFieldStates extends IFieldStates<INumber> {}

export interface IBooleanFieldProps extends IFieldProps<IBoolean> {}

export interface IBooleanFieldStates extends IFieldStates<IBoolean> {}
