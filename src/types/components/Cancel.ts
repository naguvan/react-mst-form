import { IForm } from "../../types";

export interface ICancelProps {
  form: IForm;
  label?: string;
  onCancel: (form?: IForm) => void;
}

export interface ICancelStates {}
