import React from 'react';
import { BaseTextInput, TextInputProps } from '../BaseTextInputs';

export class PasswordInput extends React.Component<TextInputProps> {
  render(): React.ReactNode {
    return <BaseTextInput type="password" {...this.props} />;
  }
}
