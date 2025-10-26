import { useState, useEffect } from "react";
import useSalesStore from "@store/useSalesStore";
import { formatCurrency } from "@utils/formatter";

export const TargetCard = () => {
  const { getTotalSales } = useSalesStore();
  const [displayPercentage, setDisplayPercentage] = useState(0);

  const currentSales = getTotalSales();
  const targetSales = 500000;
  const remainingSale = Math.max(0, targetSales - currentSales);

  const getPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const actualPercentage = getPercentage(currentSales, targetSales);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayPercentage(actualPercentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [actualPercentage]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <h3 className="text-2xs md:text-sm text-white">
        Marketing goal for this year
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

      <div>
        {/*sales progress bar*/}
        <div className="flex flex-row gap-1 items-center">
          {/* outer */}
          <div className="w-[90%] h-1 md:h-2 rounded-full bg-gray-50">
            {/* inner */}
            <div
              className="h-full rounded-full bg-emerald-400 transition-all ease-out duration-500"
              style={{ width: `${displayPercentage.toFixed(0)}%` }}
            ></div>
          </div>
          {/* progression percentage */}
          <span className="text-white text-3xs md:text-xs">
            {displayPercentage.toFixed(0)}%
          </span>
        </div>
        {/* sale remaining */}
        {remainingSale > 0 ? (
          <div className="text-3xs md:text-sm text-gray-200">
            <span>{formatCurrency(remainingSale)}</span>{" "}
            <span>more to hit target!</span>
          </div>
        ) : (
          <div className="text-3xs md:text-sm text-gray-200">
            Target achieved! {"\u{1F389}"}
          </div>
        )}
      </div>
    </div>
  );
};

export default TargetCard;
