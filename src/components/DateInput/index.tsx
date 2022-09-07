import React from 'react';
import { BaseTextInput, TextInputProps } from '../BaseTextInputs';

/**
 * This component is just basic text inpput with style.
 *  Deciding on calendar system or native system is pending.
 */
export class DateInput extends React.Component<TextInputProps> {
  render(): React.ReactNode {
    return <BaseTextInput type="date" {...this.props} />;
  }
}
