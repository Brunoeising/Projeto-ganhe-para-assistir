import type { NextPage } from "next";
import Head from "next/head";
import LandingPage from "../../src/templates/LandingPage";

const Welcome: NextPage = () => {
  return (
    <>
      <Head>
        <title>WVW</title>
        <meta
          name="description"
          content="Assista, Interaja, Ganhe: Junte-se à nossa plataforma revolucionária que une influenciadores, patrocinadores e o público em uma experiência única de vídeo recompensada com a tecnologia blockchain."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </>
  );
};

export default Welcome;
