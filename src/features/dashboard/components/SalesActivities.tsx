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

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth();
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
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
  }, [salesData]);

  const Status = ({ type }: { type: string }) => {
    return (
      <div
        className={`p-1 rounded-lg text-xs font-medium 
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

  return (
    <div className="h-full overflow-auto">
      <table className="w-full mb-1 border-separate border-spacing-1 md:border-spacing-2 bg-white">
        <thead>
          <tr className="text-[10px] text-center text-slate-400 font-medium">
            {HEADERS.map((header) => (
              <th className="sticky top-0 px-2 py-3 bg-white">{header}</th>
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

              <td className="">
                <Status type={invoice.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
