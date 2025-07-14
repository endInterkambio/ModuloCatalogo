
import { PDFViewer } from "@react-pdf/renderer";
import "./App.css";
import { DynamicPdfDocument } from "@components/DynamicPdfDocument";
import { booksData } from "@/data/booksData";

function App() {
  return (
    <PDFViewer width={800} height={600}>
      <DynamicPdfDocument data={booksData} />
    </PDFViewer>
  );
}

export default App;
