import NameInput from "components/title-form/inputs/name-input/NameInput";
import SubmitButton from "components/title-form/inputs/submit-button/SubmitButton";
import styles from "./TitleForm.module.scss";

const TitleForm = () => {
  return (
    <div className={styles.pageTitleContainer}>
      <div className={styles.rowContainer}>
        <div className={styles.title}>How common is my name?</div>
        <NameInput />
      </div>
      <div className={styles.rowContainer}>
        <SubmitButton />
      </div>
    </div>
  );
};

export default TitleForm;
