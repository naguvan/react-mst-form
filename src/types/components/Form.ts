import { IForm } from '../models/Form';

import { WithStyles } from 'material-ui';

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
}

export interface IFormStates {}
