import { useAppContext } from "context/AppContext";
import { KeyboardEventHandler, useEffect, useRef } from "react";
import styles from "./NameInput.module.scss";

const ENTER_KEY = "Enter";

const NameInput = () => {
  const { name, setName, fetchDataAllDecades } = useAppContext();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      /* autoFocus works somewhat inconsistently */
      inputRef.current?.focus();

      const valueLength = inputRef?.current?.value?.length || 0;
      /* The default focus() places the cursor at the beginning of
      the input text. Bit awkward, so let's place it at the end */
      inputRef.current.selectionStart = valueLength;
      inputRef.current.selectionEnd = valueLength;
    }
  }, []);

  const checkSubmit: KeyboardEventHandler = (e) => {
    if (e.code === ENTER_KEY) {
      fetchDataAllDecades();
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        autoFocus
        className={styles.nameInput}
        type="text"
        value={name}
        onChange={({ target }) => setName(target.value)}
        spellCheck="false"
        onKeyUp={checkSubmit}
      />
    </div>
  );
};

export default NameInput;
