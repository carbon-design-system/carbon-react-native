import React from 'react';
import { BaseTextInput } from '../BaseTextInputs';
import { TextInputProps } from '../../types/shared';

/**
 * PasswordInput component for rendering an input field for passwords with toggle to view
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/PasswordInput.tsx | Example code}
 */

export class PasswordInput extends React.Component<TextInputProps> {
  render() {
    return <BaseTextInput type="password" {...this.props} />;
  }
}
