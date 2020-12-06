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

const UpdateBranchPriceModal = ({ isShowing, hide, onUpdateSuccess, initPriceData, branchId }) => {
  async function updatePrice() {
    var laborCost = document.getElementById("laborCost").value;
    var sparePartPrice = document.getElementById("sparePartPrice").value;
    let priceData = {
      maintenanceServiceId: initPriceData.serviceId,
      laborCost: parseInt(laborCost),
      sparePartPrice: parseInt(sparePartPrice),
    };
    await instance.post(`api/branch/${branchId}/price`, priceData);
    hide();
    onUpdateSuccess();
  }

  return isShowing
    ? ReactDOM.createPortal(
        <CModal show={isShowing} onClose={hide}>
          <CModalHeader closeButton>
            <CModalTitle>Cập nhật giá</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs="12">
                <CForm className="was-validated" action="" method="post">
                  <CFormGroup>
                    <CLabel htmlFor="name">Giá phụ tùng</CLabel>
                    <CInput
                      className="is-valid"
                      id="sparePartPrice"
                      defaultValue={initPriceData.sparePartPrice}
                      placeholder="Nhập giá"
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="name">Giá nhân công</CLabel>
                    <CInput
                      className="is-valid"
                      id="laborCost"
                      defaultValue={initPriceData.laborCost}
                      placeholder="Nhập giá"
                      required
                    />
                  </CFormGroup>
                </CForm>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={updatePrice}>
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

export default UpdateBranchPriceModal;
