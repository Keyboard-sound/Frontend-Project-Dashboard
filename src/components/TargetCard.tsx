import useSalesStore from "../store/useSalesStore";
import { formatCurrency } from "../utils/formatter";

export const TargetCard = () => {
  const { getTotalSales } = useSalesStore();

  const currentSales = getTotalSales();
  const targetSales = 50000;
  const remainingSale = targetSales - currentSales;

  const getPercentage = (current: number, target: number) => {
    return (current / target) * 100;
  };

  const pregressPercentage = getPercentage(currentSales, targetSales);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <h3 className="text-2xs md:text-sm text-white">
        Marketing goal for the this year
      </h3>
      <div>
        <div className="font-semibold">
          <span className="text-lg md:text-3xl text-white">
            {formatCurrency(currentSales)}
          </span>{" "}
          <span className="text-2xs md:text-sm text-gray-200">{`/ ${formatCurrency(
            targetSales
          )}`}</span>
        </div>
      </div>

      <div className="">
        {/*sales progress bar*/}
        <div className="flex flex-row gap-1 items-center">
          {/* outer */}
          <div className="w-[90%] h-[2px] md:h-1 rounded-full bg-gray-50">
            {/* inner */}
            <div
              className="h-full md:h-1 rounded-full bg-emerald-400"
              style={{ width: `${pregressPercentage.toFixed(0)}%` }}
            ></div>
          </div>
          {/* progression percentage */}
          <span className="text-white text-3xs md:text-xs">
            {pregressPercentage.toFixed(0)}%
          </span>
        </div>
        {/* sale remaining */}
        <div className="text-3xs md:text-sm text-gray-200">
          <span>{formatCurrency(remainingSale)}</span>{" "}
          <span>more to hit target!</span>
        </div>
      </div>
    </div>
  );
};

export default TargetCard;
