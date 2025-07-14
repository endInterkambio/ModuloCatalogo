import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import { type Books } from "data/booksData";

// Use Books interface from the data module
interface DynamicPdfDocumentProps {
  data: Books[];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    padding: 5,
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  column: {
    flex: 1,
    marginHorizontal: 2,
  },
  section: {
    margin: 5,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    height: 250, // Adjust this value according to the content
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  bookImage: {
    width: 150,
    height: 200,
    objectFit: "cover",
    borderRadius: 4,
    marginBottom: 8,
    alignSelf: "center",
  },
  mainTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  item: {
    fontSize: 10,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
    color: "#2196f3",
    fontWeight: "bold",
  }
});

export const DynamicPdfDocument = ({ data }: DynamicPdfDocumentProps) => {
  // Divide data on 3 columns
  const columnCount = 3;
  const itemsPerColumn = Math.ceil(data.length / columnCount);
  const columns = Array.from({ length: columnCount }, (_, i) =>
    data.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.mainTitle}>Catálogo de libros</Text>
        <View style={styles.columnsContainer}>
          {columns.map((column, colIdx) => (
            <View key={colIdx} style={styles.column}>
              {column.map((item) => (
                <View key={item.Name} style={styles.section}>
                  {item.URL && (
                    <Image src={item.URL} style={styles.bookImage} />
                  )}
                  <Text style={styles.item}>{item.Name}</Text>
                  <Text style={styles.item}>{item.Publisher}</Text>
                  <Text style={styles.item}>{item.Author}</Text>
                  <Text style={styles.price}>S/. {item.PreciodeVenta.toFixed(2)}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
