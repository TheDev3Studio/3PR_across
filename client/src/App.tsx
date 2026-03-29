import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { FloatingActions } from "./components/FloatingActions";
import { useVisitorCounter } from "./hooks/useVisitorCounter";
import { AboutPage } from "./pages/AboutPage";
import { CatalogPage } from "./pages/CatalogPage";
import { HomePage } from "./pages/HomePage";
import { InquiryPage } from "./pages/InquiryPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";

function App() {
  const traffic = useVisitorCounter();

  return (
    <Layout>
      <FloatingActions monthlyVisitors={traffic.uniqueCount} monthlyVisits={traffic.totalVisits} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
