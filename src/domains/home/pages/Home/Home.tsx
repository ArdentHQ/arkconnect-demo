import { Layout } from "@/app/components/Layout";
import { LoginOverlay } from "@/domains/home/components/LoginOverlay";

export const Home = () => {
  return (
    <Layout>
      <div className="sm:flex sm:items-center sm:h-full sm:w-full sm:mt-[8vw]">
        <LoginOverlay />
      </div>
    </Layout>
  );
};
