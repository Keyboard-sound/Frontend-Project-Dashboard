import { useMemo } from "react";
import useSalesStore from "../store/useSalesStore";

interface SalesActType {
  id: string;
  customerName: string;
  date: Date;
  amount: number;
  customerEmail: string;
  productId: number;
  status: string;
  channel: string;
}

export default function SalesAct() {
  const { salesData } = useSalesStore();

  const invoices: SalesActType[] = useMemo(() => {
    return salesData
      .map((sale) => ({
        id: sale.id,
        customerName: sale.customerName,
        date: sale.date,
        amount: sale.total,
        customerEmail: sale.customerEmail,
        productId: sale.productId,
        status: sale.status,
        channel: sale.channel,
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, [salesData]);

  const renderedInvoices = invoices.map((invoice) => (
    <div key={invoice.id} className="flex gap-4 text-sm font-medium space-y-3">
      <div>
        <span>{invoice.id}</span>
      </div>
      <div>
        <span>{invoice.customerName}</span>
      </div>
      <div>
        <span>{invoice.date.toString()}</span>
      </div>
      <div>
        <span>{invoice.amount}</span>
      </div>
      <div>
        <span>{invoice.customerEmail}</span>
      </div>
      <div>
        <span>{invoice.productId}</span>
      </div>
      <div>
        <span>{invoice.status}</span>
      </div>
    </div>
  ));

  return (
    <div>
      <h3 className="font-semibold mb-2">Latest Invoices</h3>
      <div className="flex gap-20">
        <span className="text-xs text-slate-400 font-medium">Invoice No.</span>
        <span className="text-[10px] text-slate-400 font-medium">
          Customer Name
        </span>
        <span className="text-[10px] text-slate-400 font-medium">Date</span>
        <span className="text-[10px] text-slate-400 font-medium">Amount</span>
        <span className="text-[10px] text-slate-400 font-medium">Email</span>
        <span className="text-[10px] text-slate-400 font-medium">
          Product ID
        </span>
        <span className="text-[10px] text-slate-400 font-medium">Status</span>
      </div>
      {renderedInvoices}
    </div>
  );
}
