// src/types.ts
export type InvoiceItem = {
  description: string;
  unitPrice: number;
  netWeight: number;
  totalAmount: number;
};

export type InvoiceData = {
  companyName: string;
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  TRN: string;
  customerAddress: string;
  items: InvoiceItem[];
  paidAmount?: number;  // Keep this as number | undefined here
};
