import PropTypes from "prop-types";
import Chart from "../Chart";
import DataLoader from "../../shared/DataLoader";
import getMonthlyConfig from "./charts/precipitationMonthly";
import useEarthEngineTimeSeries from "../../../hooks/useEarthEngineTimeSeries";
import useEarthEngineClimateNormals from "../../../hooks/useEarthEngineClimateNormals";
import { era5Monthly, era5MonthlyNormals } from "../../../data/datasets";

const PrecipitationMonthly = ({ orgUnit, period, referencePeriod }) => {
  const data = useEarthEngineTimeSeries(era5Monthly, period, orgUnit);

  const normals = useEarthEngineClimateNormals(
    era5MonthlyNormals,
    referencePeriod,
    orgUnit
  );

  if (!data || !normals) {
    return <DataLoader height={400} />;
  }

  return (
    <Chart
      config={getMonthlyConfig(
        orgUnit.properties.name,
        data,
        normals,
        referencePeriod
      )}
    />
  );
};

PrecipitationMonthly.propTypes = {
  orgUnit: PropTypes.object.isRequired,
  period: PropTypes.object.isRequired,
  referencePeriod: PropTypes.object.isRequired,
};

export default PrecipitationMonthly;
