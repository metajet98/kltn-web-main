import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CLabel,
  CRow,
} from "@coreui/react";
import { DatetimeInput } from "react-datetime-inputs";
import instance from "src/network/http_client";

import { trackPromise } from "react-promise-tracker";
import LocalStorage from "src/storage/local_storage";
var moment = require("moment"); // require

const fields = ["id", "plateNumber", "time", "status", "print"];

const MaintenancePage = () => {
  const [maintenances, setMaintenances] = useState();

  const [filterDate, setFilterDate] = useState(moment());

  useEffect(() => {
    trackPromise(loadMaintenance());
  }, [filterDate]);

  async function loadMaintenance() {
    var branchId = LocalStorage.getStaffBranchId();
    var params = {
      branchId: branchId,
      date: filterDate.toISOString(),
    };
    const response = await instance.get("api/maintenance", {
      params: params,
    });
    if (response && response.data) {
      setMaintenances(response.data.data);
    }
  }

  async function onPrintClickHandle(maintenanceId) {
    trackPromise(buildPdf(maintenanceId));
  }

  async function buildPdf(maintenanceId) {
    const response = await instance.get(`api/maintenance/${maintenanceId}/pdf`);
    if (response && response.data.data) {
      window.open(response.data.data, "_blank")
    }
  }

  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm="5">
                  <h4 id="traffic" className="card-title mb-0">
                    Danh sách lượt bảo dưỡng
                  </h4>
                </CCol>
                <CCol sm="3" className="d-none d-md-block">
                  <DatetimeInput
                    onChange={(e) => {
                      console.log(e);
                      setFilterDate(e);
                    }}
                    date-format="dd/MM/yyyy"
                    datetime={filterDate}
                  />
                </CCol>
              </CRow>
              <br />
              <br />
              <CDataTable
                items={maintenances}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  time: (item) => (
                    <td>{new Date(item.createdDate).toDateString()}</td>
                  ),
                  plateNumber: (item) => (
                    <td>{item.userVehicle.plateNumber}</td>
                  ),
                  status: (item) => <td>{getStatusText(item.status)}</td>,
                  print: (item) => (
                    <td>
                      <CButton
                        onClick={() => onPrintClickHandle(item.id)}
                        size="sm"
                        color="info"
                      >
                        In hoá đơn
                      </CButton>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );

  function getStatusText(status) {
    switch (status) {
      case 0:
        return "Mới tạo";
      case 1:
        return "Đang bảo dưỡng";
      case 2:
        return "Đã xong";
      default:
        return "";
    }
  }
};

export default MaintenancePage;
