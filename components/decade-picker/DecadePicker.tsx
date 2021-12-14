import { useAppContext } from "context/AppContext";
import { useEffect, useState } from "react";
import { DECADES } from "config";
import ArrowLeftSvg from "../../icons/arrow-left.svg";
import ArrowRightSvg from "../../icons/arrow-right.svg";
import styles from "./DecadePicker.module.scss";

const DecadePicker = () => {
  const [decadeIndex, setDecadeIndex] = useState(0);
  const { setDecade } = useAppContext();

  const decrementDecade = () => {
    setDecadeIndex((index) => (index > 0 ? index - 1 : index));
  };
  const incrementDecade = () => {
    setDecadeIndex((index) => (index < DECADES.length - 1 ? index + 1 : index));
  };

  useEffect(() => {
    setDecade(DECADES[decadeIndex]);
  }, [decadeIndex, setDecade]);

  const permitDecrement = decadeIndex > 0;
  const permitIncrement = decadeIndex < DECADES.length - 1;

  return (
    <div className={styles.container}>
      <span className={styles.label}>
        Let&apos;s pick a decade and state to look at:
      </span>
      <div className={styles.picker}>
        <button
          aria-label="Decrement decade"
          disabled={!permitDecrement}
          className={`${styles.arrowIconButton} ${
            permitDecrement ? "" : styles.hidden
          }`}
          onClick={decrementDecade}
        >
          <ArrowLeftSvg />
        </button>
        <span>{DECADES[decadeIndex]}</span>
        <button
          aria-label="Increment decade"
          disabled={!permitIncrement}
          className={`${styles.arrowIconButton} ${
            permitIncrement ? "" : styles.hidden
          }`}
          onClick={incrementDecade}
        >
          <ArrowRightSvg />
        </button>
      </div>
    </div>
  );
};

export default DecadePicker;
