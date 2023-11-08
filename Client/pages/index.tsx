import type { NextPage } from "next";
import Head from "next/head";
import { Video } from "../@types";
import AppLayout from "../src/layouts/AppLayout";
import api from "../src/services/api";
import Home from "../src/templates/Home";
import ProtectedRoute from "../src/templates/ProtectedRoute";

type Parceiro = {
  channel_nome: string;
  channel_id: string;
  videos: Video[];
};

export async function getStaticProps() {
  const { data } = await api.get<Parceiro[]>("/video/parceiros");

  // each 5 hours the page will be revalidated
  return {
    props: {
      data,
    },
    revalidate: 18000,
  };
}

const IndexPage = ({ data }: { data: Parceiro[] }) => {
  return (
    <>
      <Head>
        <title>Plataforma - WVM</title>
        <meta name="description" content="Plataforma WVM" />
        <link rel="icon" href="https://wvwcoin.com/img/favicon.png" />
      </Head>
      <ProtectedRoute>
        <AppLayout>
          <Home data={data} />
        </AppLayout>
      </ProtectedRoute>
    </>
  );
};

export default IndexPage;
