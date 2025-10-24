import useSalesStore from "../store/useSalesStore";

export const TargetCard = () => {
  const { salesData, getTotalSales } = useSalesStore();

  const currentSales = getTotalSales();

  console.log("current", currentSales);
  console.log("salesData", salesData);

  const getPercentage = (current: number, target: number) => {
    return (current / target) * 100;
  };
  const targetSales = 1000000;

  const pregressPercentage = getPercentage(currentSales, targetSales);

  return (
    <>
      <h2 className="text-3xs md:text-sm text-white">
        Marketing goal for the this year
      </h2>
      {/*sales progress bar*/}
      <div className="flex flex-row gap-1 py-2 items-center">
        {/* outer */}
        <div className="w-[90%] h-[2px] md:h-1 rounded-full bg-gray-50">
          {/* inner */}
          <div className="w-5 h-[2px] md:h-1 rounded-full bg-emerald-400"></div>
        </div>
        {/* progression percentage */}
        <span className="text-white text-2xs md:text-xs">
          {pregressPercentage.toFixed(0)}%
        </span>
      </div>
      {/* sales achieved */}
      <div>
        <span>{currentSales}</span>
      </div>
    </>
  );
};

export default TargetCard;
