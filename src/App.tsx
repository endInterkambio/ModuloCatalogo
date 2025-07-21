import "@/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductListPage from "@components/ProductListPage";
import NavBarComponent from "@components/NavBarComponent";

function App() {
  return (
    <>
      <NavBarComponent />
      <ProductListPage />
    </>
  );
}

export default App;
