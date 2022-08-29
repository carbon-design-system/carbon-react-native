import React from 'react';
import { BaseTextInput, TextInputProps } from '../BaseTextInputs';

export class TextInput extends React.Component<TextInputProps> {
  render(): React.ReactNode {
    return <BaseTextInput type="text" {...this.props} />;
  }
}
