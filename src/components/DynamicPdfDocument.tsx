import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { type Books } from "data/booksData";

// use Books interface from the data module
interface DynamicPdfDocumentProps {
  data: Books[];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  item: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export const DynamicPdfDocument = ({ data }: DynamicPdfDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de libros</Text>
      {data.map((item) => (
        <View key={item.Name} style={styles.section}>
          <Text style={styles.item}>Nombre: {item.Name}</Text>
          <Text style={styles.item}>Descripción: {item.Description}</Text>
          <Text style={styles.item}>Autor: {item.Author}</Text>
          <Text style={styles.item}>Precio: ${item.PreciodeVenta.toFixed(2)}</Text>
        </View>
      ))}
    </Page>
  </Document>
);
