import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import instance from "src/network/http_client";

import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CInput,
  CInputFile,
  CForm,
  CRow,
  CCol,
  CLabel,
  CButton,
  CImg,
  CFormText,
} from "@coreui/react";
import { trackPromise } from "react-promise-tracker";

const DenyScheduleReviewModal = ({ isShowing, hide, scheduleId, onDenySuccess }) => {
  const [review, setReview] = useState();

  async function denySchedule() {
    let reviewParams = {
      IsApprove: false,
      Review: review,
    };
    await instance.post(`api/calender/${scheduleId}`, reviewParams);
    hide();
    onDenySuccess();
  }

  return isShowing
    ? ReactDOM.createPortal(
        <CModal show={isShowing} onClose={hide}>
          <CModalHeader closeButton>
            <CModalTitle>Lý do từ chối</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol>
                <CForm className="was-validated" action="" method="post">
                  <CFormText>Trả lời</CFormText>
                  <CFormGroup>
                    <CInput
                      className="is-valid"
                      onChange={(e) => setReview(e.target.value)}
                      id="name"
                      placeholder="Nhập lý do từ chối"
                      required
                    />
                  </CFormGroup>
                </CForm>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" color="primary" onClick={denySchedule}>
              Xác nhận
            </CButton>
            <CButton color="secondary" onClick={hide}>
              Hủy
            </CButton>
          </CModalFooter>
        </CModal>,
        document.body
      )
    : null;
};

export default DenyScheduleReviewModal;
