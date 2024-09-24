import Chart from "../Chart";
import PeriodTypeSelect from "../PeriodTypeSelect";
import MonthlyPeriodSelect from "../MonthlyPeriodSelect";
import ReferencePeriod from "../ReferencePeriodSelect";
import DataLoader from "../../shared/DataLoader";
import Resolution from "../../shared/Resolution";
import getMonthlyConfig from "./charts/precipitationMonthly";
import useEarthEngineTimeSeries from "../../../hooks/useEarthEngineTimeSeries";
import useEarthEngineClimateNormals from "../../../hooks/useEarthEngineClimateNormals";
import exploreStore from "../../../store/exploreStore";
import useAppSettings from "../../../hooks/useAppSettings";
import { era5Monthly, era5MonthlyNormals } from "../../../data/datasets";

const PrecipitationMonthly = () => {
  const orgUnit = exploreStore((state) => state.orgUnit);
  const monthlyPeriod = exploreStore((state) => state.monthlyPeriod);
  const referencePeriod = exploreStore((state) => state.referencePeriod);
  const { settings } = useAppSettings();

  const data = useEarthEngineTimeSeries(era5Monthly, monthlyPeriod, orgUnit);

  const normals = useEarthEngineClimateNormals(
    era5MonthlyNormals,
    referencePeriod,
    orgUnit
  );

  return (
    <>
      <PeriodTypeSelect />
      {data && normals ? (
        <Chart
          config={getMonthlyConfig(
            orgUnit.properties.name,
            data,
            normals,
            referencePeriod,
            settings
          )}
        />
      ) : (
        <DataLoader />
      )}
      <MonthlyPeriodSelect />
      <ReferencePeriod />
      <Resolution resolution={era5Monthly.resolution} />
    </>
  );
};

export default PrecipitationMonthly;
