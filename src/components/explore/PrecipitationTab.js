import PropTypes from "prop-types";
import Chart from "./Chart";
import getMonthlyConfig from "./charts/precipitationMonthly";
import getDailyConfig from "./charts/precipitationDaily";

const PrecipitationTab = ({
  name,
  periodType,
  monthlyData,
  dailyData,
  monthlyPeriod,
  referencePeriod,
}) => (
  <>
    {periodType === "monthly" ? (
      <Chart
        config={getMonthlyConfig(
          name,
          monthlyData,
          monthlyPeriod,
          referencePeriod
        )}
      />
    ) : (
      <Chart config={getDailyConfig(name, dailyData)} />
    )}
  </>
);

PrecipitationTab.propTypes = {
  name: PropTypes.string.isRequired,
  periodType: PropTypes.string.isRequired,
  monthlyData: PropTypes.array.isRequired,
  dailyData: PropTypes.array.isRequired,
  monthlyPeriod: PropTypes.object.isRequired,
  referencePeriod: PropTypes.string.isRequired,
};

export default PrecipitationTab;
