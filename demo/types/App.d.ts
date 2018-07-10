/// <reference types="react" />
import { WithStyles } from '@material-ui/core';
export interface IAppStyles {
    root: React.CSSProperties;
    container: React.CSSProperties;
    form: React.CSSProperties;
    paper: React.CSSProperties;
    submit: React.CSSProperties;
}
export interface IAppStyleProps extends WithStyles<keyof IAppStyles> {
}
export interface IAppProps {
    style?: React.CSSProperties;
    className?: string;
}
export interface IAppStates {
}
