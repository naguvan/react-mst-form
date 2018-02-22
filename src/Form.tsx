import * as React from 'react';
import { Component, ReactNode } from 'react';

import { WithStyles, StyledComponentProps } from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import * as classNames from 'classnames';

import FormView from './components/Form';
import FormSubmit from './components/Submit';
import { renderer as FieldRenderer } from './components/Field';
import FormModel from './models/Form';

import { IFormConfig, IForm } from '@root/types';

import { observer } from 'mobx-react';
import { onSnapshot, onPatch } from 'mobx-state-tree';

export interface IFormStyles {
    root: React.CSSProperties;
    form: React.CSSProperties;
    submit: React.CSSProperties;
}

export interface IFormStyleProps extends WithStyles<keyof IFormStyles> {}

export interface IFormProps {
    style?: React.CSSProperties;
    className?: string;
    config: IFormConfig;
    onSubmit: (values: { [key: string]: any }) => void;
    onErrors?: (errors: { [key: string]: Array<string> }) => void;
    onPatch?: (
        patch: {
            op: 'replace' | 'add' | 'remove';
            path: string;
            value?: any;
        }
    ) => void;
    onSnapshot?: (snapshot: {}) => void;
}

export interface IFormStates {
    form: IForm;
}

@observer
export class Form extends Component<IFormProps & IFormStyleProps, IFormStates> {
    constructor(props: IFormProps & IFormStyleProps, context: any) {
        super(props, context);
        const { config, onPatch: _onPatch, onSnapshot: _onSnapshot } = props;
        const form = FormModel.create(config);
        this.state = { form };

        if (_onSnapshot) {
            onSnapshot(form, snapshot => _onSnapshot(snapshot));
        }
        if (_onPatch) {
            onPatch(form, patch => _onPatch(patch));
        }
    }

    public render(): ReactNode {
        const { form } = this.state;
        const { className, classes, style, onSubmit, onErrors } = this.props;
        const root: string = classNames(
            classes!.root,
            className,
            classes!.form
        );
        return (
            <>
                <FormView
                    className={root}
                    style={style}
                    form={form}
                    renderer={FieldRenderer}
                />
                <div className={classes.submit}>
                    <FormSubmit {...{ form, onSubmit, onErrors }} />
                </div>
            </>
        );
    }
}

export default withStyles<keyof IFormStyles>({
    root: {},
    form: {
        padding: 10
    },
    submit: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 10
    }
})(Form);
