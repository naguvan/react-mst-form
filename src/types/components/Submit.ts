import { ReactNode } from 'react';
import { IForm } from '@root/types';

export interface ISubmitProps {
    form: IForm;
    label?: string;
    onSubmit?: (values: { [key: string]: any }) => void;
}

export interface ISubmitStates {}
