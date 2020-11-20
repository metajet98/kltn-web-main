import ReactDOM from "react-dom";
import React, { useState } from "react";
import instance from "src/network/http_client";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CInput,
  CForm,
  CRow,
  CCol,
  CLabel,
  CButton,
} from "@coreui/react";

const AddTypeModal = ({ isShowing, hide, onAddSuccess }) => {
  const [typeName, setTypeName] = useState();

  async function createType() {
    let typeData = {
      typeName: typeName,
    };
    await instance.post("api/vehicle-type", typeData);
    hide();
    onAddSuccess();
  }

  return isShowing
    ? ReactDOM.createPortal(
        <CModal show={isShowing} onClose={hide}>
          <CModalHeader closeButton>
            <CModalTitle>Thêm loại xe</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs="12">
                <CForm action="" method="post">
                  <CFormGroup>
                    <CLabel htmlFor="name">Tên loại xe</CLabel>
                    <CInput
                      onChange={(e) => setTypeName(e.target.value)}
                      id="name"
                      placeholder="Nhập tên loại xe"
                      required
                    />
                  </CFormGroup>
                </CForm>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={createType}>
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

export default AddTypeModal;
