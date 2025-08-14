import Header from './Header';
import Footer from './Footer';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
