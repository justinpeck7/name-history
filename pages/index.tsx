import Map from "components/map/Map";
import DecadePicker from "components/decade-picker/DecadePicker";
import TitleForm from "components/title-form/TitleForm";
import type { NextPage } from "next";
import Head from "next/head";
import { getRandomName } from "pages/api/random-name";
import { AppContextProvider } from "../context/AppContext";
import styles from "./Home.module.scss";
import NameDecadeChart from "components/name-decade-chart/NameDecadeChart";

type HomeProps = {
  randomName: string;
};

const Home: NextPage<HomeProps> = ({ randomName }) => {
  return (
    <div>
      <Head>
        <title>How Common is My Name?</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppContextProvider randomName={randomName}>
        <div className={styles.pageContainer}>
          <TitleForm />
          <div className={styles.contentBox}>
            <DecadePicker />
            <Map />
          </div>
          <div className={styles.contentBox}>
            <NameDecadeChart />
          </div>
        </div>
      </AppContextProvider>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  return {
    props: {
      randomName: await getRandomName(),
    },
  };
};
