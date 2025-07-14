import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define types for the data
interface DataItem {
  id: number;
  name: string;
  value: string;
  author: string;
}

interface DynamicPdfDocumentProps {
  data: DataItem[];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
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
        <View key={item.id} style={styles.section}>
          <Text style={styles.item}>Nombre: {item.name}</Text>
          <Text style={styles.item}>Valor: {item.value}</Text>
          <Text style={styles.item}>Autor: {item.author}</Text>
        </View>
      ))}
    </Page>
  </Document>
);
