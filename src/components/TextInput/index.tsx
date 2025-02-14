import React from 'react';
import { BaseTextInput } from '../BaseTextInputs';
import { TextInputProps } from '../../types/shared';

/**
 * TextInput component for rendering text input box
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/TextInput.tsx | Example code}
 */
export class TextInput extends React.Component<TextInputProps> {
  render() {
    return <BaseTextInput type="text" {...this.props} />;
  }
}
