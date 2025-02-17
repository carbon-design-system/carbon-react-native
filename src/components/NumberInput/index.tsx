import React from 'react';
import { BaseTextInput } from '../BaseTextInputs';
import { TextInputProps } from '../../types/shared';

/**
 * NumberInput component for rendering an input for numbers with increment/decrement
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/NumberInput.tsx | Example code}
 */
export class NumberInput extends React.Component<TextInputProps> {
  render() {
    return <BaseTextInput type="number" {...this.props} />;
  }
}
