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
import DenyScheduleReviewModal from "./deny_shedule_review_modal";
import useModal from "src/views/useModal";
var moment = require("moment"); // require

const fields = ["id", "user", "notes", "time", "status", "action"];

const SchedulePage = () => {
  const [schedules, setSchedules] = useState();

  const [filterDate, setFilterDate] = useState(moment());

  const [selectedScheduleId, setSelectedScheduleId] = useState();

  const {
    isShowing: isShowingDenyScheduleReviewModal,
    toggle: toggleDenyScheduleReviewModal,
  } = useModal();

  useEffect(() => {
    trackPromise(loadSchedule());
  }, [filterDate]);

  function getStatusText(status) {
    if (status == 1) return "Đã duyệt";
    else if (status == 2) return "Bị từ chối";
    else return "";
  }

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

  async function approveSchedule(id) {
    const response = await instance.post(`api/calender/${id}`, {
      IsApprove: true,
    });
    console.log(response);
    if (response && response.data) {
      loadSchedule();
    }
  }

  return (
    <div>
      <DenyScheduleReviewModal
        scheduleId={selectedScheduleId}
        hide={toggleDenyScheduleReviewModal}
        isShowing={isShowingDenyScheduleReviewModal}
        onDenySuccess={() => loadSchedule()}
      />
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
                  status: (item) => <td>{getStatusText(item.status)}</td>,
                  action: (item) => (
                    <td>
                      {item.status == null && (
                        <div>
                          <CButton
                            onClick={() => {
                              approveSchedule(item.id);
                            }}
                            size="sm"
                            color="info"
                          >
                            Đồng ý
                          </CButton>
                          <CButton
                            onClick={() => {
                              setSelectedScheduleId(item.id);
                              toggleDenyScheduleReviewModal();
                            }}
                            size="sm"
                            color="danger"
                          >
                            Từ chối
                          </CButton>
                        </div>
                      )}
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
};

export default SchedulePage;
