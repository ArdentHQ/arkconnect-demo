import { Layout } from "@/app/components/Layout";
import { Welcome } from "@/domains/home/components/Welcome";

export const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="sm:flex sm:items-center sm:h-full sm:w-full sm:mt-[8vw]">
          <Welcome />
        </div>
      </div>
    </Layout>
  );
};
