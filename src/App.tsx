//import { PDFViewer } from "@react-pdf/renderer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
//import { DynamicPdfDocument } from "@components/DynamicPdfDocument";
//import { booksData } from "@/data/booksData";
import BookPage from "./pages/BooksPage";
import NavBar from "@components/NavBar";

function App() {
  return (
    <>
      {/*<PDFViewer width={800} height={600}>
        <DynamicPdfDocument data={booksData} />
      </PDFViewer>*/}
      <NavBar/>
      <BookPage />
    </>
  );
}

export default App;
