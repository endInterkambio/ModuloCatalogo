
import { PDFViewer } from "@react-pdf/renderer";
import "./App.css";
import { DynamicPdfDocument } from "./components/DynamicPdfDocument";


const exampleData = [
  { id: 1, name: "Juan Pérez", value: "Valor 1" },
  { id: 2, name: "Ana Gómez", value: "Valor 2" },
  { id: 3, name: "Carlos Ruiz", value: "Valor 3" },
];

function App() {
  return (
    <PDFViewer width={800} height={600}>
      <DynamicPdfDocument data={exampleData} />
    </PDFViewer>
  );
}

export default App;
