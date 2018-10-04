import { IForm } from "../../../types";

export interface ISubmitProps {
  form: IForm;
  label?: string;
  onSubmit?: (values: { [key: string]: any }) => void;
  onErrors?: (errors: { [key: string]: Array<string> }) => void;
}

export interface ISubmitStates {}
