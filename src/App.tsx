
import { PDFViewer } from "@react-pdf/renderer";
import "./App.css";
import { DynamicPdfDocument } from "./components/DynamicPdfDocument";


const exampleData = [
  { id: 1, name: "El alquimista", value: "Valor 1", author: "Paulo Coelho" },
  { id: 2, name: "Harry Potter", value: "Valor 2", author: "J.K. Rowling" },
  { id: 3, name: "Las sombras del viento", value: "Valor 3", author: "Carlos Ruiz Zafón" },
];

function App() {
  return (
    <PDFViewer width={800} height={600}>
      <DynamicPdfDocument data={exampleData} />
    </PDFViewer>
  );
}

export default App;
