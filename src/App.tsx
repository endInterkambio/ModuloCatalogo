//import { PDFViewer } from "@react-pdf/renderer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
//import { DynamicPdfDocument } from "@components/DynamicPdfDocument";
//import { booksData } from "@/data/booksData";
import BookPage from "./pages/BooksPage";

function App() {
  return (
    <>
      {/*<PDFViewer width={800} height={600}>
        <DynamicPdfDocument data={booksData} />
      </PDFViewer>*/}
      <BookPage />
    </>
  );
}

export default App;
