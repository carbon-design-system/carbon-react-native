import React from 'react';
import { BaseTextInput, TextInputProps } from '../BaseTextInputs';

export class TextArea extends React.Component<TextInputProps> {
  render(): React.ReactNode {
    return <BaseTextInput type="text-area" {...this.props} />;
  }
}
