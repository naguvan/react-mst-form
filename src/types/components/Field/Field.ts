import { IForm, IField } from '@root/types/models';

export interface IFieldProps<T extends IField> {
    field: T;
    form: IForm;
}

export interface IFieldStates<T extends IField> {}
