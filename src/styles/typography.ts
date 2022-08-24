/**
 * This file includes all the exported typography styles.  These are auto used by the `Text` component.
 * You can use them directly for any other text styles.
 * This repo includes only the fonts used directly.
 * If you want to use other fonts you can download them and store them in your app and follow same directions on README.
 */

type FontWeights = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;

/** Plex light styling */
export const LightPlex = {
  fontWeight: '300' as FontWeights,
  fontFamily: 'IBMPlexSans-Light',
};

/** Plex regular styling */
export const RegularPlex = {
  fontWeight: '400' as FontWeights,
  fontFamily: 'IBMPlexSans-Regular',
};

/** Plex semi-bold styling */
export const SemiBoldPlex = {
  fontWeight: '600' as FontWeights,
  fontFamily: 'IBMPlexSans-SemiBold',
};

/** Plex Mono regular styling */
export const MonoRegularPlex = {
  fontWeight: '400' as FontWeights,
  fontFamily: 'IBMPlexMono',
};

/** Code-01 text style (Productive) */
export const Code01 = {
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.32,
  ...MonoRegularPlex,
};

/** Code-02 text style (Expressive) */
export const Code02 = {
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.32,
  ...MonoRegularPlex,
};

/** Label-01 text style (Productive) */
export const Label01 = {
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.32,
  ...RegularPlex,
};

/** Label-02 text style (Expressive) */
export const Label02 = {
  fontSize: 14,
  lineHeight: 18,
  letterSpacing: 0.16,
  ...RegularPlex,
};

/** Helper-text-01 text style (Productive) */
export const HelperText01 = {
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.32,
  ...RegularPlex,
};

/** Helper-text-02 text style (Expressive) */
export const HelperText02 = {
  fontSize: 14,
  lineHeight: 18,
  letterSpacing: 0.16,
  ...RegularPlex,
};

/** Legal-01 text style (Productive) */
export const Legal01 = {
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.32,
  ...RegularPlex,
};

/** Legal-02 text style (Expressive) */
export const Legal02 = {
  fontSize: 14,
  lineHeight: 18,
  letterSpacing: 0.16,
  ...RegularPlex,
};

/** Body-compact-01 text style (Productive) */
export const BodyCompact01 = {
  fontSize: 14,
  lineHeight: 18,
  letterSpacing: 0.16,
  ...RegularPlex,
};

/** Body-compact-02 text style (Expressive) */
export const BodyCompact02 = {
  fontSize: 16,
  lineHeight: 22,
  letterSpacing: 0,
  ...RegularPlex,
};

/** Body-01 text style (Productive) */
export const Body01 = {
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.16,
  ...RegularPlex,
};

/** Body-02 text style (Expressive) */
export const Body02 = {
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0,
  ...RegularPlex,
};

/** Heading-compact-01 text style (Productive) */
export const HeadingCompact01 = {
  fontSize: 14,
  lineHeight: 18,
  letterSpacing: 0.16,
  ...SemiBoldPlex,
};

/** Heading-compact-02 text style (Expressive) */
export const HeadingCompact02 = {
  fontSize: 16,
  lineHeight: 22,
  letterSpacing: 0,
  ...SemiBoldPlex,
};

/** Heading-01 text style (Productive) */
export const Heading01 = {
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.16,
  ...SemiBoldPlex,
};

/** Heading-02 text style (Expressive) */
export const Heading02 = {
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0,
  ...SemiBoldPlex,
};

/** Heading-03 text style (Productive) */
export const Heading03 = {
  fontSize: 20,
  lineHeight: 28,
  letterSpacing: 0,
  ...RegularPlex,
};

/** Heading-04 text style (Productive) */
export const Heading04 = {
  fontSize: 28,
  lineHeight: 36,
  letterSpacing: 0,
  ...RegularPlex,
};

/** Heading-05 text style (Productive) */
export const Heading05 = {
  fontSize: 32,
  lineHeight: 40,
  letterSpacing: 0,
  ...LightPlex,
};

/** Heading-06 text style (Productive) */
export const Heading06 = {
  fontSize: 42,
  lineHeight: 50,
  letterSpacing: 0,
  ...LightPlex,
};

/** Heading-07 text style (Productive) */
export const Heading07 = {
  fontSize: 54,
  lineHeight: 64,
  letterSpacing: 0,
  ...LightPlex,
};
