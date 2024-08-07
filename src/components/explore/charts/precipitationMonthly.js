import i18n from "@dhis2/d2-i18n";
import { colors } from "@dhis2/ui";
import {
  animation,
  credits,
  getSelectedMonths,
  getPrecipitationMonthNormal,
  getMonthlyPeriod,
} from "../../../utils/chart";
import { metersToMillimeters } from "../../../utils/calc";

const getChartConfig = (name, data, monthlyPeriod, referencePeriod) => {
  const months = getSelectedMonths(data, monthlyPeriod);

  const series = months.map((d) => ({
    x: new Date(d.id).getTime(),
    y: metersToMillimeters(d["total_precipitation_sum"]),
  }));

  const normals = months.map((d) => ({
    x: new Date(d.id).getTime(),
    y: getPrecipitationMonthNormal(data, d.id.substring(5, 7), referencePeriod),
  }));

  return {
    title: {
      text: i18n.t("{{name}}: Monthly precipitation {{period}}", {
        name,
        period: getMonthlyPeriod(monthlyPeriod),
        nsSeparator: ";",
      }),
    },
    subtitle: {
      text: i18n.t("Normals from reference period: {{period}}", {
        period: referencePeriod,
        nsSeparator: ";",
      }),
    },
    credits,
    tooltip: {
      shared: true,
      valueSuffix: " mm",
    },
    chart: {
      type: "column",
      height: 480,
      marginBottom: 75,
    },
    plotOptions: {
      series: {
        groupPadding: 0,
        borderWidth: 0,
        animation,
      },
    },
    xAxis: {
      type: "datetime",
      tickInterval: 2592000000,
      labels: {
        format: "{value: %b}",
      },
    },
    yAxis: {
      min: 0,
      title: false,
      labels: {
        format: "{value} mm",
      },
    },
    series: [
      {
        data: series,
        name: i18n.t("Monthly precipitation"),
        color: colors.blue500,
        zIndex: 1,
      },
      {
        data: normals,
        name: i18n.t("Normal precipitation"),
        color: colors.blue200,
        pointPlacement: -0.1,
        zIndex: 0,
      },
    ],
  };
};

export default getChartConfig;
