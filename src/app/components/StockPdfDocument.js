import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "60%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  tableCol: {
    width: "60%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableColHeaderSmall: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  tableColSmall: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
});

const SeoRoutesPdf = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>SEO Routes Analysis Report</Text>
      
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text>Route</Text>
          </View>
          <View style={styles.tableColHeaderSmall}>
            <Text>Count</Text>
          </View>
          <View style={styles.tableColHeaderSmall}>
            <Text>Priority</Text>
          </View>
        </View>
        
        {/* Table Rows */}
        {data.map((route, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text>{route.route}</Text>
            </View>
            <View style={styles.tableColSmall}>
              <Text>{route.count}</Text>
            </View>
            <View style={styles.tableColSmall}>
              <Text>{route.count > 1000 ? 'High' : route.count > 500 ? 'Medium' : 'Low'}</Text>
            </View>
          </View>
        ))}
      </View>
      
      {/* Summary Section */}
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Summary</Text>
      <Text style={{ marginTop: 10 }}>
        Total Routes: {data.length}
      </Text>
      <Text>
        High Priority Routes: {data.filter(r => r.count > 1000).length}
      </Text>
      <Text>
        Security Concern Routes: {data.filter(r => 
          r.route.includes('.env') || 
          r.route.includes('wp-') || 
          r.route.includes('config')
        ).length}
      </Text>
    </Page>
  </Document>
);

export default SeoRoutesPdf;