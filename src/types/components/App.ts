import { WithStyles } from 'material-ui';

export interface IAppStyles {
    root: React.CSSProperties;
    form: React.CSSProperties;
}

export interface IAppStyleProps extends WithStyles<keyof IAppStyles> {}

export interface IAppProps {
    style?: React.CSSProperties;
    className?: string;
}

export interface IAppStates {}
