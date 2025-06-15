import React from "react";
import {
  Document as PdfDocument,
  Page as PdfPage,
  Text as PdfText,
  View as PdfView,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register Helvetica font
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/helvetica/Helvetica-Regular.ttf",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#000",
    lineHeight: 1.4,
    position: "relative",
  },
  headerContainer: {
    marginBottom: 16,
    textAlign: "center",
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  companyDetails: {
    fontSize: 8,
    lineHeight: 1.2,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 1,
  },
  customerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  customerBox: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    flex: 2,
    marginRight: 8,
  },

  row: {
    flexDirection: "row",
    marginBottom: 2,
  },
  label: {
    width: 60, // adjust this width as needed
    fontWeight: "bold",
  },
  value: {
    flex: 1,
  },

  invoiceMetaBox: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    flex: 1,
  },
  customerTextBlock: {
    fontWeight: "bold",
    fontSize: 10,
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
  },
  table: {
    display: "table",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#000",
  },
  tableHeader: {
    backgroundColor: "#e0e0e0",
  },
  tableCellHeader: {
    fontWeight: "bold",
    padding: 6,
    borderRightWidth: 1,
    borderColor: "#000",
    flex: 3,
    textAlign: "center",
  },
  tableCell: {
    padding: 6,
    borderRightWidth: 1,
    borderColor: "#000",
    flex: 3,
    textAlign: "center",
  },
  tableCellDescription: {
    padding: 6,
    borderRightWidth: 1,
    borderColor: "#000",
    flex: 3,
    textAlign: "left",
  },
  totalsContainer: {
    width: 350,
    marginLeft: "auto",
    marginTop: 20,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  totalsLabel: {
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9,
    borderTopWidth: 1,
    borderColor: "#000",
    paddingTop: 8,
    paddingHorizontal: 12,
    marginHorizontal: 20,
  },
});

type InvoiceItem = {
  description: string;
  unitPrice: number;
  netWeight: number;
  totalAmount: number;
};

type InvoiceData = {
  customerName: string;
  customerAddress: string;
  TRN: string;
  customerDetails?: string;
  invoiceNumber: string;
  invoiceDate: string;
  vehicleNo?: string;
  purchaser?: string;
  items: InvoiceItem[];
  paidAmount: number;
  adjustment: number;
  driverTip: string;
  companyName: "company1" | "company2";
};

const InvoicePDF = ({ data }: { data: InvoiceData }) => {
  const totalWeight = data.items
    .reduce((acc, item) => acc + Number(item.netWeight || 0), 0)
    .toFixed(3);
  const totalAmount = data.items.reduce(
    (acc, item) => acc + Number(item.totalAmount || 0),
    0
  );
  const vat = Number((totalAmount * 0.05).toFixed(2));
  const grandTotal = totalAmount + vat;
  const change =
    Number(data.paidAmount || 0) - grandTotal - Number(data.adjustment || 0);

  const companies = {
    company1: {
      name: "SUMON HANIF SCRAP AND METAL WASTE TRADING L.L.C.",
      details: [
        "P.O. Box: 5328, Dubai - UAE",
        "Tel.: +97142677707",
        "Email: admin.gbs@sumonHanif.com",
        "TRN No.: 100247745100003",
      ],
    },
    company2: {
      name: "AL SETOU METAL SCRAP. TR",
      details: [
        "P.O. Box: 1234, Sharjah - UAE",
        "Tel.: +97112345678",
        "Email: contact@alsetoumetal.com",
        "TRN No.: 103208918500003",
      ],
    },
  };

  const selectedCompany = companies[data.companyName] || companies.company1;

  return (
    <PdfDocument>
      <PdfPage size="A4" style={styles.page}>
        {/* Header */}
        <PdfView style={styles.headerContainer}>
          <PdfText style={styles.companyName}>{selectedCompany.name}</PdfText>
          {selectedCompany.details.map((detail, i) => (
            <PdfText key={i} style={styles.companyDetails}>
              {detail}
            </PdfText>
          ))}
        </PdfView>

        <PdfText style={styles.title}>TAX INVOICE</PdfText>

        {/* Customer & Invoice Info */}
        <PdfView style={styles.customerContainer}>
          <PdfView style={styles.customerBox}>
            {[
              { label: "Customer", value: data.customerName },
              { label: "TRN", value: data.TRN },
              { label: "Address", value: data.customerAddress },
            ].map((item, i) => (
              <PdfView key={i} style={styles.row}>
                <PdfText style={styles.label}>{item.label}</PdfText>
                <PdfText style={styles.value}>{item.value}</PdfText>
              </PdfView>
            ))}
          </PdfView>

          <PdfView style={styles.invoiceMetaBox}>
            <PdfText>
              <PdfText style={{ fontWeight: "bold" }}>Inv. No. </PdfText>
              {data.invoiceNumber || "N/A"}
            </PdfText>
            <PdfText>
              <PdfText style={{ fontWeight: "bold" }}>Inv. Date </PdfText>
              {data.invoiceDate || "N/A"}
            </PdfText>
          </PdfView>
        </PdfView>

        {/* Items Table */}
        <PdfView style={[styles.table]}>
          <PdfView style={[styles.tableRow, styles.tableHeader]}>
            <PdfText style={styles.tableCellHeader}>SN</PdfText>
            <PdfText style={styles.tableCellHeader}>ITEM</PdfText>
            <PdfText style={styles.tableCellHeader}>UNIT PRICE (AED)</PdfText>
            <PdfText style={styles.tableCellHeader}>NET WT</PdfText>
            <PdfText style={styles.tableCellHeader}>TOTAL (AED)</PdfText>
          </PdfView>

          {data.items.map((item, i) => (
            <PdfView key={i} style={styles.tableRow}>
              <PdfText style={styles.tableCell}>{i + 1}</PdfText>
              <PdfText style={styles.tableCellDescription}>
                {item.description}
              </PdfText>
              <PdfText style={styles.tableCell}>{item.unitPrice?.toFixed(2)}</PdfText>
              <PdfText style={styles.tableCell}>{item.netWeight?.toFixed(3)}</PdfText>
              <PdfText style={styles.tableCell}>
                {item.totalAmount.toFixed(2)}
              </PdfText>
            </PdfView>
          ))}
        </PdfView>

        {/* Totals */}
        <PdfView style={styles.totalsContainer}>
          <PdfView style={styles.totalsRow}>
            <PdfText style={styles.totalsLabel}>TOTAL</PdfText>
            <PdfText>{totalWeight} (kg)</PdfText>
            <PdfText>{totalAmount.toFixed(2)}</PdfText>
          </PdfView>
          <PdfView style={styles.totalsRow}>
            <PdfText style={styles.totalsLabel}>VAT 5%</PdfText>
            <PdfText></PdfText>
            <PdfText>{vat.toFixed(2)}</PdfText>
          </PdfView>
          <PdfView style={styles.totalsRow}>
            <PdfText style={styles.totalsLabel}>GRAND TOTAL</PdfText>
            <PdfText></PdfText>
            <PdfText>{grandTotal.toFixed(2)}</PdfText>
          </PdfView>
          <PdfView style={styles.totalsRow}>
            <PdfText style={styles.totalsLabel}>PAID AMOUNT</PdfText>
            <PdfText></PdfText>
            <PdfText>{Number(data.paidAmount).toFixed(2)}</PdfText>
          </PdfView>
          <PdfView style={styles.totalsRow}>
            <PdfText style={styles.totalsLabel}>CHANGE AMOUNT</PdfText>
            <PdfText></PdfText>
            <PdfText>{change.toFixed(2)}</PdfText>
          </PdfView>
        </PdfView>

        {/* Footer */}
        <PdfView style={styles.footer}>
          <PdfText>{selectedCompany.name}</PdfText>
          <PdfText>Receiver</PdfText>
        </PdfView>
      </PdfPage>
    </PdfDocument>
  );
};

export default InvoicePDF;
