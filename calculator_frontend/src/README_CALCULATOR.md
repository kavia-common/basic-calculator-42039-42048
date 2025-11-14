# Ocean Professional Calculator

This calculator provides basic arithmetic operations with a modern Ocean Professional theme (blue and amber accents) and accessible micro-interactions.

## Features
- Addition, subtraction, multiplication, division
- Clear and equals functions
- Keyboard input support (digits, operators, Enter/=, Backspace, Esc), plus memory actions

## Structure
- `components/Calculator.tsx` — main UI component
- `components/calculator.module.css` — styles for the calculator
- `lib/calcUtils.ts` — calculation logic

## Design polish and accessibility

Ocean Professional refinements included:
- Depth and micro-interactions: layered shadows, soft container gradient, hover-lift, and press animations using transform (avoids layout shift).
- Buttons: subtle gradient/shine, smooth transitions (~180ms), active scale to 0.98, and high-contrast focus outlines with a primary glow.
- Operator/equals emphasis: blue/amber accents with sufficient contrast (dark text on light amber).
- Display: improved hierarchy and subtle inset feel, plus a CSS-only blinking caret to indicate ready state.
- Responsiveness: increased spacing and minimum hit target size (44x44px).

Accessibility:
- Focus ring preserved and enhanced with high-contrast color and outline-offset.
- Reduced motion respected using `prefers-reduced-motion: reduce` to disable transitions/animations, including the display caret blink.
- Transform-based animations used to prevent layout shift for hover/press effects.

No logic changes are included in this polish.
