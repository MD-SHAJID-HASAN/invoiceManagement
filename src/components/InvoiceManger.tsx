'use client';

import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import InvoicePDF from '@/components/InvoicePDF';

type InvoiceItem = {
  description: string;
  unitPrice: number;
  netWeight: number;
  totalAmount: number;
};

type InvoiceData = {
  companyName: string;
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  TRN: string;
  customerAddress: string;
  items: InvoiceItem[];
  paidAmount?: number;
};

interface InvoiceManagerProps {
  invoiceData: InvoiceData;
}

export default function InvoiceManager({ invoiceData }: InvoiceManagerProps) {
  console.log(invoiceData);
  return (
    <div className="invoice-container mx-auto text-black text-sm font-sans h-[842px] relative">
      {/* Live PDF Preview */}
      <PDFViewer width="100%" height="100%">
        <InvoicePDF data={invoiceData} />
      </PDFViewer>

      {/* Download Button */}
      <div className="p-4 hidden">
        <PDFDownloadLink
          document={<InvoicePDF data={invoiceData} />}
          fileName={`Invoice-${invoiceData.invoiceNumber}.pdf`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
