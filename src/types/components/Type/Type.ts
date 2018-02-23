import { IForm, IType } from '@root/types/models';

export interface ITypeProps<T extends IType> {
    type: T;
    form: IForm;
}

export interface ITypeStates<T extends IType> {}
