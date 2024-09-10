import { useEffect } from "react";
import i18n from "@dhis2/d2-i18n";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import OrgUnitType from "./OrgUnitType";
import exploreStore from "../../utils/exploreStore";
import styles from "./styles/OrgUnit.module.css";

const tabIsValid = (tab, orgUnit) =>
  tab === "forecast10days" && orgUnit.geometry.type !== "Point" ? false : true;

const OrgUnit = () => {
  const orgUnit = useLoaderData();
  const { pathname } = useLocation();
  const { tab, setTab } = exploreStore();
  const navigate = useNavigate();

  const uriTab = pathname.split("/")[3]; // TODO: Better way to get tab?

  // Set default type based on org unit geometry type
  useEffect(() => {
    if (!uriTab) {
      if (tab && tabIsValid(tab, orgUnit)) {
        navigate(`/explore/${orgUnit.id}/${tab}`);
      } else {
        setTab(
          orgUnit.geometry.type === "Point" ? "forecast10days" : "temperature"
        );
      }
    }
  }, [orgUnit, tab, uriTab, setTab, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.orgUnit}>
        <h1>
          {orgUnit.properties.name}{" "}
          <OrgUnitType type={orgUnit.geometry?.type} />
        </h1>
        {orgUnit.geometry ? (
          <Outlet context={orgUnit} />
        ) : (
          <div className={styles.message}>{i18n.t("No geometry found")}</div>
        )}
      </div>
    </div>
  );
};

export default OrgUnit;
