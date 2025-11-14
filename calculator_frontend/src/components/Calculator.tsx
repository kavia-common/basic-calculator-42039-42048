"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./calculator.module.css";
import {
  CalcState,
  Operator,
  backspace,
  clearAll,
  clearEntry,
  computePercentage,
  evaluate,
  formatDisplay,
  initialState,
  inputDecimal,
  inputDigit,
  setOperator,
  toggleSign,
} from "@/lib/calcUtils";

/**
 * PUBLIC_INTERFACE
 * Calculator component renders a responsive calculator UI and handles input via mouse and keyboard.
 */
export default function Calculator(): React.ReactElement {
  /** Central calculator panel with display and buttons; supports keyboard input. */
  const [state, setState] = useState<CalcState>(() => initialState());
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onDigit = (d: string) => setState((s) => inputDigit(s, d));
  const onDecimal = () => setState((s) => inputDecimal(s));
  const onToggleSign = () => setState((s) => toggleSign(s));
  const onPercent = () => setState((s) => computePercentage(s));
  const onOperator = (op: Operator) => setState((s) => setOperator(s, op));
  const onClearEntry = () => setState((s) => clearEntry(s));
  const onClearAll = () => setState(() => clearAll());
  const onBackspace = () => setState((s) => backspace(s));
  const onEqual = () => setState((s) => evaluate(s));

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      // prevent default for keys we handle to avoid scrolling on space/backspace etc.
      const handledKeys = /[0-9]|[\+\-\*\/=\.]|Enter|Backspace|Escape|%/;
      if (handledKeys.test(key)) e.preventDefault();

      if (/^[0-9]$/.test(key)) {
        onDigit(key);
        return;
      }
      if (key === ".") {
        onDecimal();
        return;
      }
      if (key === "+") {
        onOperator("+");
        return;
      }
      if (key === "-") {
        onOperator("-");
        return;
      }
      if (key === "*" ) {
        onOperator("×");
        return;
      }
      if (key === "/") {
        onOperator("÷");
        return;
      }
      if (key === "Enter" || key === "=") {
        onEqual();
        return;
      }
      if (key === "Backspace") {
        onBackspace();
        return;
      }
      if (key === "Escape") {
        onClearAll();
        return;
      }
      if (key === "%") {
        onPercent();
        return;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const displayPrimary = useMemo(() => {
    return state.currentValue === "Error" ? "Error" : formatDisplay(state.currentValue);
  }, [state.currentValue]);

  const displaySecondary = useMemo(() => {
    if (state.previousValue && state.operator) {
      return `${formatDisplay(state.previousValue)} ${state.operator}`;
    }
    return "";
  }, [state.previousValue, state.operator]);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <div className={styles.calculator} aria-label="Calculator">
        <div className={styles.display} role="region" aria-live="polite" aria-atomic="true">
          <div className={styles.secondary}>{displaySecondary}</div>
          <div className={`${styles.primary} ${state.currentValue === "Error" ? styles.error : ""}`}>
            {displayPrimary}
          </div>
        </div>

        <div className={styles.grid}>
          {/* Top row: CE, C, %, +/- */}
          <button className={styles.action} onClick={onClearEntry} aria-label="Clear Entry">
            CE
          </button>
          <button className={styles.action} onClick={onClearAll} aria-label="Clear All">
            C
          </button>
          <button className={styles.action} onClick={onPercent} aria-label="Percent">
            %
          </button>
          <button className={styles.action} onClick={onToggleSign} aria-label="Toggle Sign">
            +/-
          </button>

          {/* Row: 7 8 9 ÷ */}
          <button className={styles.num} onClick={() => onDigit("7")}>
            7
          </button>
          <button className={styles.num} onClick={() => onDigit("8")}>
            8
          </button>
          <button className={styles.num} onClick={() => onDigit("9")}>
            9
          </button>
          <button className={styles.op} onClick={() => onOperator("÷")} aria-label="Divide">
            ÷
          </button>

          {/* Row: 4 5 6 × */}
          <button className={styles.num} onClick={() => onDigit("4")}>
            4
          </button>
          <button className={styles.num} onClick={() => onDigit("5")}>
            5
          </button>
          <button className={styles.num} onClick={() => onDigit("6")}>
            6
          </button>
          <button className={styles.op} onClick={() => onOperator("×")} aria-label="Multiply">
            ×
          </button>

          {/* Row: 1 2 3 - */}
          <button className={styles.num} onClick={() => onDigit("1")}>
            1
          </button>
          <button className={styles.num} onClick={() => onDigit("2")}>
            2
          </button>
          <button className={styles.num} onClick={() => onDigit("3")}>
            3
          </button>
          <button className={styles.op} onClick={() => onOperator("-")} aria-label="Subtract">
            −
          </button>

          {/* Bottom row: 0 . = + */}
          <button className={`${styles.num} ${styles.span2}`} onClick={() => onDigit("0")}>
            0
          </button>
          <button className={styles.num} onClick={onDecimal}>
            .
          </button>
          <button className={`${styles.op} ${styles.equal}`} onClick={onEqual} aria-label="Equals">
            =
          </button>
          <button className={styles.op} onClick={() => onOperator("+")} aria-label="Add">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
