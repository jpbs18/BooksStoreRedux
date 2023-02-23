import Header from "../header";
import Aside from "../aside";
import Footer from "../footer";
import { Layout } from "./style";
import { PageLayoutProps } from "./types";

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <Layout>
      <Header />
      <Aside />
      {children}
      <Footer />
    </Layout>
  );
};

export default PageLayout;
