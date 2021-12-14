import { useAppContext } from "context/AppContext";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import styles from "./NameDecadeChart.module.scss";

const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const NameDecadeChart = () => {
  const { stateData, decadeData, name, decade, state } = useAppContext();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const chartContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stateData && !scrolled) {
      setScrolled(true);
      (chartContainer?.current as HTMLDivElement)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [stateData]);

  /* TODO: get this typing sorted */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const barData: any = useMemo(() => {
    if (stateData) {
      return {
        labels: stateData.years,
        datasets: [
          {
            label: `Females given the name ${name}`,
            data: stateData.femaleNameCounts,
            backgroundColor: "#f4a261",
          },
          {
            label: `Males given the name ${name}`,
            data: stateData.maleNameCounts,
            backgroundColor: "#2a9d8f",
          },
        ],
      };
    }
    return null;
  }, [stateData, name]);

  if (!stateData && !decadeData) return null;

  if (!stateData && decadeData) {
    return (
      <div className={styles.title}>
        Select a state to see year-by-year data
      </div>
    );
  }

  return (
    <div>
      <div className={styles.title}>
        Popularity of the name {name} across the {decade} in {state?.name}
      </div>
      <div className={styles.chartContainer} ref={chartContainer}>
        <Bar data={barData} options={options} />
      </div>
    </div>
  );
};

export default NameDecadeChart;
