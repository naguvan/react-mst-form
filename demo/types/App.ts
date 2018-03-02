import { WithStyles } from 'material-ui';
import { IFormConfig } from '@root/types';

export interface IAppStyles {
    root: React.CSSProperties;
    container: React.CSSProperties;
    form: React.CSSProperties;
    paper: React.CSSProperties;
    submit: React.CSSProperties;
}

export interface IAppStyleProps extends WithStyles<keyof IAppStyles> {}

export interface IAppProps {
    style?: React.CSSProperties;
    className?: string;
}

export interface IAppStates {
    width: string;
    height: string;
    config: IFormConfig;
}
