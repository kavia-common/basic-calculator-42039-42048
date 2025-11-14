Ocean Professional Calculator

- UI: Central panel with rounded corners, subtle shadows, and gradient backdrop.
- Theme Colors: primary #2563EB, secondary #F59E0B, error #EF4444, text #111827, surfaces #ffffff on background #f9fafb.

Features
- Core Operations: add (+), subtract (−), multiply (×), divide (÷)
- Extra Operations: percent (%), sign toggle (±), backspace (⌫), clear entry (CE), clear all (C)
- Memory Functions: MC (clear), MR (recall), M+ (add to memory), M- (subtract from memory)
- Display: shows current entry and previous operand+operator; errors are shown in themed error color

New Keypad Layout (ergonomic, 4-column grid)
- Top row: MC  MR  M+  M-  C
- Second:  %   ±   ⌫   ÷
- Third:   7   8   9   ×
- Fourth:  4   5   6   −
- Fifth:   1   2   3   +
- Bottom:  0 (span 2)   .   = (highlighted)

Accessibility & Interaction
- Tab order is left-to-right, top-to-bottom.
- Enter triggers equals (=). Space/Enter activates the focused button.
- Buttons have a minimum touch-target size of 44px and visible focus rings.
- The = button is highlighted (amber) for emphasis.

Keyboard Shortcuts
- Digits: 0–9
- Decimal: .
- Operators: +, -, *, /
- Equals: Enter or =
- Percent: %
- Backspace: Backspace key
- Clear All: Escape
- Toggle Sign: S or Shift + - (underscore)
- Memory:
  - MR: M
  - MC: Shift + M
  - M+: Ctrl + M (Cmd + M on macOS)
  - M-: Alt + M

Implementation Notes
- Calculation logic is centralized in src/lib/calcUtils.ts:
  - Public functions include inputDigit, inputDecimal, setOperator, evaluate, toggleSign, computePercentage, backspace, clearEntry, clearAll, memoryClear, memoryRecall, memoryAdd, memorySubtract.
- The UI lives in src/components/Calculator.tsx with responsive styling in src/components/calculator.module.css following the Ocean Professional theme.
