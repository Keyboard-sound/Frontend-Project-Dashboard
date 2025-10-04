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

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

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

  return (
    <div>
      <h3 className="font-semibold mb-1">Latest Invoices</h3>
      <table className="w-full border-separate border-spacing-x-2 border-spacing-y-3 text-left">
        <thead>
          <tr>
            <th className="w-20 text-xs text-slate-400 font-medium pb-1">
              Invoice No.
            </th>
            <th className="w-25 text-[10px] text-slate-400 font-medium">
              Customer Name
            </th>
            <th className="w-10 text-[10px] text-slate-400 font-medium">
              Date
            </th>
            <th className="w-25 text-[10px] text-slate-400 text-center font-medium">
              Amount
            </th>
            <th className="w-25 text-[10px] text-slate-400 font-medium">
              Email
            </th>
            <th className="w-20 text-[10px] text-slate-400 font-medium">
              Product ID
            </th>
            <th className="w-20 text-[10px] text-slate-400 font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className=" text-xs font-medium">
              <td>{invoice.id}</td>

              <td>{invoice.customerName}</td>

              <td>{formatDate(invoice.date.toString())}</td>

              <td className="text-emerald-400 text-center">
                ${invoice.amount.toLocaleString("en-US")}
              </td>

              <td>{invoice.customerEmail}</td>

              <td>{invoice.productId}</td>

              <td className="text-center">
                <div
                  className={`w-20 px-2 py-1 rounded-lg text-xs font-medium 
                    ${
                      invoice.status === "completed"
                        ? "bg-emerald-200 text-emerald-400"
                        : invoice.status === "returns"
                        ? "bg-rose-200 text-rose-400"
                        : "bg-gray-200 text-slate-400"
                    }`}
                >
                  {invoice.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
