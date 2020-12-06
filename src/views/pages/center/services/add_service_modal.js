import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
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
} from "@coreui/react";

const AddServiceModal = ({ isShowing, hide, onAddSuccess, vehicleGroupId }) => {
  var serviceName = useRef();
  var serviceDescription = useRef();

  async function createService() {
    let serviceData = {
      name: serviceName.current,
      description: serviceDescription.current,
      vehicleGroupId: vehicleGroupId,
    };
    await instance.post(`api/maintenance/service`, serviceData);
    hide();
    onAddSuccess();
  }

  return isShowing
    ? ReactDOM.createPortal(
        <CModal show={isShowing} onClose={hide}>
          <CModalHeader closeButton>
            <CModalTitle>Thêm dịch vụ</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs="12">
                <CForm className="was-validated" action="" method="post">
                  <CFormGroup>
                    <CLabel htmlFor="name">Tên</CLabel>
                    <CInput
                      className="is-valid"
                      onChange={(e) => {
                        serviceName.current = e.target.value;
                      }}
                      id="name"
                      placeholder="Nhập tên"
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="name">Description</CLabel>
                    <CInput
                      className="is-valid"
                      onChange={(e) => {
                        serviceDescription.current = e.target.value;
                      }}
                      id="description"
                      placeholder="Nhập chi tiết"
                      required
                    />
                  </CFormGroup>
                </CForm>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={createService}>
              Thêm
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

export default AddServiceModal;
