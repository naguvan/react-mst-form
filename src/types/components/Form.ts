import { ReactNode } from 'react';
import { WithStyles } from 'material-ui';

import { IForm } from '../models/Form';
import { IField } from '../models/Field';

export interface IFormStyles {
    root: React.CSSProperties;
    layout: React.CSSProperties;
    set: React.CSSProperties;
    item: React.CSSProperties;
}

export interface IFormStyleProps extends WithStyles<keyof IFormStyles> {}

export interface IFormProps {
    form: IForm;
    style?: React.CSSProperties;
    className?: string;
    renderer(field: IField, form: IForm): ReactNode;
}

export interface IFormStates {
    active: number;
}
