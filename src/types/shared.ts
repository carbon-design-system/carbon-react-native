import { LinkProps } from '../components/Link';
import { TextBreakModes } from '../components/Text';
import { NativeSyntheticEvent, TextInputProps as ReactTextInputProps, StyleProp, TextInputFocusEventData, ViewStyle } from 'react-native';

/**
 * Icon type to pass to components that take icon directly.
 * Icon should not use createIcon.  Pass directly from import
 * `import AddIcon from '@carbon/icons/es/add/20';` for example
 * */
export type CarbonIcon = unknown;

/** Basic text input types */
export type BaseTextInputTypes = 'text' | 'text-area' | 'password' | 'number' | 'date';

/** Shared props for Text, Password and TextArea */
export type TextInputProps = {
  /** Value of text (Controlled component) */
  value: string;
  /** Label string to use */
  label?: string;
  /** Helper string to use */
  helperText?: string;
  /** Check is invalid */
  isInvalid?: (value: string) => boolean;
  /** Error string to use. Set custom rules or return required text */
  getErrorText?: (value: string) => string;
  /** Warning string to use. This will show if NOT in error. */
  warningText?: string;
  /** Placeholder text to use */
  placeholder?: string;
  /** Indicate if required */
  required?: boolean;
  /** Indicate if disabled */
  disabled?: boolean;
  /** Label break mode */
  labelBreakMode?: TextBreakModes;
  /** Change event when text changed */
  onChangeText: (value: string) => void;
  /** Blur event when focus is lost */
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Focus event when focus is gained */
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Indicate if autoCorrect should be used (default is true) */
  autoCorrect?: boolean;
  /** Define auto cap rule (default is normally sentences) */
  autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
  /** Trigger ENTER event (consumer should validate if form is valid and submit if this is called) */
  onSubmitEditing?: () => void;
  /** Indicate if should be secured (password) */
  secureTextEntry?: boolean;
  /** Max length of field */
  maxLength?: number;
  /** Indicate if text box is used on layer */
  light?: boolean;
  /** minHeight for text area */
  textAreaMinHeight?: number;
  /** @remarks password only. Text to use for toggle password button (accessibility). Defaults to ENGLISH "Show/hide password" */
  togglePasswordText?: string;
  /** @remarks number only. Text to use for increment number button (accessibility). Defaults to ENGLISH "Increment" */
  incrementNumberText?: string;
  /** @remarks number only. Text to use for decrement number button (accessibility). Defaults to ENGLISH "Decrement" */
  decrementNumberText?: string;
  /** @remarks number only. Min and Max for numbers. If not set any number (including negative is valid) */
  numberRules?: {
    min?: number;
    max?: number;
  };
  /** Link to render to right of label */
  labelLink?: LinkProps;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Helpful for fully customizing text input behavior. */
  componentProps?: ReactTextInputProps;
};
