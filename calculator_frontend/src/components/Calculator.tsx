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
  memoryAdd,
  memorySubtract,
  memoryRecall,
  memoryClear,
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
  const onMemoryAdd = () => setState((s) => memoryAdd(s));
  const onMemorySub = () => setState((s) => memorySubtract(s));
  const onMemoryRecall = () => setState((s) => memoryRecall(s));
  const onMemoryClear = () => setState((s) => memoryClear(s));

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      // prevent default for keys we handle to avoid scrolling on space/backspace etc.
      const handledKeys = /[0-9]|[\+\-\*\/=\.]|Enter|Backspace|Escape|%|m|c|C/i;
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
      if (key === "*") {
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
      if (key === "Escape" || key.toLowerCase() === "c") {
        onClearAll();
        return;
      }
      if (key === "%") {
        onPercent();
        return;
      }
      // Toggle sign shortcut: key 's' or '_' (Shift + - yields underscore) or F9 common on some calc keyboards
      if (key.toLowerCase() === "s" || key === "_") {
        onToggleSign();
        return;
      }
      // Optional memory shortcuts:
      // m => recall, Shift+m => clear, Alt+m => M-, Ctrl+m => M+
      if (key.toLowerCase() === "m") {
        if (e.shiftKey) {
          onMemoryClear();
        } else if (e.altKey) {
          onMemorySub();
        } else if (e.ctrlKey || e.metaKey) {
          onMemoryAdd();
        } else {
          onMemoryRecall();
        }
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
          <div className={styles.secondary}>
            <span aria-hidden={!state.memory || state.memory === 0} title="Memory indicator">
              {state.memory !== 0 ? "M " : ""}
            </span>
            {displaySecondary}
          </div>
          <div className={`${styles.primary} ${state.currentValue === "Error" ? styles.error : ""}`}>
            {displayPrimary}
          </div>
        </div>

        <div className={styles.grid}>
          {/* Memory row: MC MR M+ M- */}
          <button className={styles.action} onClick={onMemoryClear} aria-label="Memory Clear (MC)" title="MC (Shift+M)">
            MC
          </button>
          <button className={styles.action} onClick={onMemoryRecall} aria-label="Memory Recall (MR)" title="MR (M)">
            MR
          </button>
          <button className={styles.action} onClick={onMemoryAdd} aria-label="Memory Add (M+)" title="M+ (Ctrl/Cmd+M)">
            M+
          </button>
          <button className={styles.action} onClick={onMemorySub} aria-label="Memory Subtract (M-)" title="M- (Alt+M)">
            M-
          </button>

          {/* Top row: CE, C, %, +/-, ⌫ */}
          <button className={styles.action} onClick={onClearEntry} aria-label="Clear Entry" title="CE">
            CE
          </button>
          <button className={styles.action} onClick={onClearAll} aria-label="Clear All" title="C / Esc">
            C
          </button>
          <button className={styles.action} onClick={onPercent} aria-label="Percent" title="%">
            %
          </button>
          <button className={styles.action} onClick={onToggleSign} aria-label="Toggle Sign" title="+/- (S)">
            +/-
          </button>
          <button className={styles.action} onClick={onBackspace} aria-label="Backspace" title="⌫ / Backspace">
            ⌫
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
