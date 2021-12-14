import styles from "./LoadingIndicator.module.scss";

const LoadingIndicator = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};
export default LoadingIndicator;
