import React from 'react';
import { BaseTextInput, TextInputProps } from '../BaseTextInputs';

export class NumberInput extends React.Component<TextInputProps> {
  render(): React.ReactNode {
    return <BaseTextInput type="number" {...this.props} />;
  }
}
