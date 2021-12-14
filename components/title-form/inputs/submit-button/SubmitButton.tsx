import { useAppContext } from "context/AppContext";
import styles from "./SubmitButton.module.scss";

const SubmitButton = () => {
  const { fetchDataAllDecades } = useAppContext();
  return (
    <button className={styles.submit} onClick={fetchDataAllDecades}>
      Show Me
    </button>
  );
};

export default SubmitButton;
