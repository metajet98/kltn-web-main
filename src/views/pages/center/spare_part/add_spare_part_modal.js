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

const AddSparePartModal = ({ isShowing, hide, onAddSuccess, vehicleGroupId }) => {
  const [sparePartName, setSparePartName] = useState();
  const [sparePartDescription, setSparePartDescription] = useState();

  async function createSparePart() {
    let sparePartData = {
      name: sparePartName,
      description: sparePartDescription,
      vehicleGroupId: vehicleGroupId
    };
    await instance.post(`api/vehicle-group/${vehicleGroupId}/spare-part`, sparePartData);
    hide();
    onAddSuccess();
  }

  return isShowing
    ? ReactDOM.createPortal(
        <CModal show={isShowing} onClose={hide}>
          <CModalHeader closeButton>
            <CModalTitle>Thêm</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs="12">
                <CForm className="was-validated" action="" method="post">
                  <CFormGroup>
                    <CLabel htmlFor="name">Tên</CLabel>
                    <CInput
                      className="is-valid"
                      onChange={(e) => setSparePartName(e.target.value)}
                      id="name"
                      placeholder="Nhập tên"
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="name">Description</CLabel>
                    <CInput
                      className="is-valid"
                      onChange={(e) => setSparePartDescription(e.target.value)}
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
            <CButton color="primary" onClick={createSparePart}>
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

export default AddSparePartModal;
