import React from 'react';
import { BaseTextInput } from '../BaseTextInputs';
import { TextInputProps } from '../../types/shared';

/**
 * This component is just basic text inpput with style.
 * Deciding on calendar system or native system is pending.
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/DateInput.tsx | Example code}
 */
export class DateInput extends React.Component<TextInputProps> {
  render(): React.ReactNode {
    return <BaseTextInput type="date" {...this.props} />;
  }
}
