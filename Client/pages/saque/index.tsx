import type { NextPage } from "next";
import Head from "next/head";
import AppLayout from "../../src/layouts/AppLayout";
import Saque from "../../src/templates/Saque";
import ProtectedRoute from "../../src/templates/ProtectedRoute";

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Saque - WVM</title>
        <meta name="description" content="Plataforma WVM" />
      </Head>
      <ProtectedRoute>
        <AppLayout>
          <Saque />
        </AppLayout>
      </ProtectedRoute>
    </>
  );
};

export default IndexPage;
