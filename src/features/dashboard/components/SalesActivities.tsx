import { useMemo } from "react";
import useSalesStore from "@store/useSalesStore";

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

const HEADERS = [
  "Invoice No.",
  "Customer Name",
  "Date",
  "Amount",
  "Email",
  "Product ID",
  "Status",
];

const Status = ({ type }: { type: string }) => {
  return (
    <div
      className={`w-full max-w-30 p-1 rounded-lg text-xs font-medium
                    ${
                      type === "completed"
                        ? "bg-emerald-200 text-emerald-400"
                        : type === "returns"
                          ? "bg-rose-200 text-rose-400"
                          : "bg-gray-200 text-slate-400"
                    }`}
    >
      <p>{type}</p>
    </div>
  );
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default function SalesActivities() {
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
        _timestamp: new Date(sale.date).getTime(),
      }))
      .sort((a, b) => b._timestamp - a._timestamp)
      .slice(0, 20);
  }, [salesData]);

  return (

      <table className="w-full pb-4 border-separate border-spacing-2 bg-white">
        <thead>
          <tr className="text-[10px] text-center align-top text-slate-400 font-medium">
            {HEADERS.map((header) => (
              <th key={header} className="sticky top-0 px-2 py-3 bg-white">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="text-[10px] text-center lg:text-xs font-medium"
            >
              <td>{invoice.id}</td>

              <td>{invoice.customerName}</td>

              <td>{formatDate(invoice.date.toString())}</td>

              <td className="text-emerald-400 text-center">
                ${invoice.amount.toLocaleString("en-US")}
              </td>

              <td>{invoice.customerEmail}</td>

              <td>{invoice.productId}</td>

              <td>
                <div className="flex justify-center items-center w-full">
                  <Status type={invoice.status} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
  );
}
