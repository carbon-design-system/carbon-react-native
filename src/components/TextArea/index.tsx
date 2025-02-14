import React from 'react';
import { BaseTextInput } from '../BaseTextInputs';
import { TextInputProps } from '../../types/shared';

/**
 * TextArea component for rendering a text area (large text input block with newline support)
 *
 * {@link https://github.com/carbon-design-system/carbon-react-native/blob/main/example/src/Views/TextArea.tsx | Example code}
 */
export class TextArea extends React.Component<TextInputProps> {
  render() {
    return <BaseTextInput type="text-area" {...this.props} />;
  }
}
