import type { NextPage } from "next";
import Head from "next/head";
import AppLayout from "../../src/layouts/AppLayout";
import Dashboard from "../../src/templates/Dashboard";
import ProtectedRoute from "../../src/templates/ProtectedRoute";

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard - WVM</title>
        <meta name="description" content="Plataforma WVM" />
      </Head>
      <ProtectedRoute>
        <AppLayout>
          <Dashboard />
        </AppLayout>
      </ProtectedRoute>
    </>
  );
};

export default IndexPage;
