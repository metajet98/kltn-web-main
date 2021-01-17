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

const fields = ["id", "user", "notes", "time"];

const SchedulePage = () => {
  const [schedules, setSchedules] = useState();

  const [filterDate, setFilterDate] = useState(moment());

  useEffect(() => {
    trackPromise(loadSchedule());
  }, [filterDate]);

  async function loadSchedule() {
    var branchId = LocalStorage.getStaffBranchId();
    var params = {
      branchId: branchId,
      date: filterDate.toISOString(),
    };
    const response = await instance.get("api/calender", {
      params: params,
    });
    console.log(response);
    if (response && response.data) {
      setSchedules(response.data.data);
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
                    Danh sách lịch
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
                items={schedules}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  user: (item) => <td>{item.user.fullName}</td>,
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default SchedulePage;
