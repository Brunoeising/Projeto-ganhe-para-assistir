import type { NextPage } from "next";
import Head from "next/head";
import AppLayout from "../../src/layouts/AppLayout";
import Admin from "../../src/templates/Admin";
import ProtectedRoute from "../../src/templates/ProtectedRoute";

const AdminPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin - WVW</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <ProtectedRoute>
        <AppLayout>
          <Admin />
        </AppLayout>
      </ProtectedRoute>
    </>
  );
};

export default AdminPage;
