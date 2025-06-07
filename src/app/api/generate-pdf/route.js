import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottom: '1px solid #eee'
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    color: '#666',
    textAlign: 'center'
  }
});

const StockPdfDocument = ({ stocks }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Fabric Stock Report</Text>
      
      {stocks.map((stock, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Stock Code:</Text>
            <Text>{stock.stockCode}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sub Category:</Text>
            <Text>{stock.subCategory}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Color:</Text>
            <Text>{stock.color}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Content:</Text>
            <Text>{stock.content}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Quantity:</Text>
            <Text>{stock.quantity}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Description:</Text>
            <Text>{stock.description}</Text>
          </View>
        </View>
      ))}
      
      <Text style={styles.footer}>
        Generated on {new Date().toLocaleDateString()} | All quantities in meters (Mir)
      </Text>
    </Page>
  </Document>
);

export default StockPdfDocument;