import { WithStyles } from 'material-ui';

export interface IFlexItemStyles {
    root: React.CSSProperties;
    center: React.CSSProperties;
}

export interface IFlexItemStyleProps
    extends WithStyles<keyof IFlexItemStyles> {}

export interface IFlexItemProps {
    center?: boolean;
    fluid?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

export interface IFlexItemStates {}

export interface IFlexSetStyles {
    root: React.CSSProperties;
    center: React.CSSProperties;
}

export interface IFlexSetStyleProps extends WithStyles<keyof IFlexSetStyles> {}

export interface IFlexSetProps {
    direction: 'row' | 'column';
    fluid?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

export interface IFlexSetStates {}
