import { ButtonProps } from "@material-ui/core/Button";

export type IButtonProps = Pick<
  ButtonProps,
  Exclude<keyof ButtonProps, "form">
>;
