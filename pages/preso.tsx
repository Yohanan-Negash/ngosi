import Footer from "@components/Footer";
import PresentationForm from "@components/PresoForm";
import { PresoForm } from "@types";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Preso: NextPage = () => {
  const router = useRouter();

  const onSubmit = async (values: PresoForm) => {
    try {
      const response = await fetch("/api/preso", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const jsonRes = await response.json();
      const { presoUid } = jsonRes;
      router.replace(`/qr?preso=${presoUid}`);
    } catch (error) {
      const { message } = error as Error;
      console.error(message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen min-w-full">
      <Head>
        <title>Ngosi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col flex-1">
        <h1 className="text-3xl bg-black py-2 px-6 text-white">
          Add Presentation
        </h1>
        <div className="pt-4 px-6">
          <div className="mt-6">
            <PresentationForm onSubmit={onSubmit} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Preso;
