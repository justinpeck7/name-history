import { useEffect, useState } from "react";
import styles from "./InfoTooltip.module.scss";

type InfoTooltipProps = {
  state?: string;
  count: number;
  totalBabies: number;
};

const InfoTooltip = ({ state = "", count, totalBabies }: InfoTooltipProps) => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({
        x: e.pageX,
        y: e.pageY,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={styles.infoTooltip}
      style={{ left: `${pos.x}px`, top: `${pos.y - 65}px` }}
    >
      <div className={styles.count}>
        {state}
        <b>{count ? `: ${count}` : ""}</b>
      </div>
      {count ? (
        <div className={styles.totalBabies}>
          <div>
            out of <b>{Number(totalBabies).toLocaleString()}</b> babies we
          </div>
          <div>have data on</div>
        </div>
      ) : null}
    </div>
  );
};

export default InfoTooltip;
