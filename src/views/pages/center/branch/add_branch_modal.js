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
  CInputFile,
  CForm,
  CRow,
  CCol,
  CLabel,
  CButton,
} from "@coreui/react";

const AddBranchModal = ({ isShowing, hide, onAddSuccess }) => {
  const [selectedFiles, setSelectedFile] = useState(undefined);
  const [branchName, setBranchName] = useState();
  const [address, setAddress] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const selectFile = (event) => {
    setSelectedFile(event.target.files);
  };

  async function createBranch() {
    let formData = new FormData();
    formData.append("file", selectedFiles[0]);
    const logoUpload = await instance.post("api/utils/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (!logoUpload || !logoUpload.data) {
      return;
    }
    let branchData = {
      name: branchName,
      address: address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      logo: logoUpload.data.data,
    };
    await instance.post("api/branch", branchData);
    hide();
    onAddSuccess();
  }

  return isShowing
    ? ReactDOM.createPortal(
        <CModal show={isShowing} onClose={hide}>
          <CModalHeader closeButton>
            <CModalTitle>Thêm chi nhánh</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs="12">
                <CForm className="was-validated" action="" method="post">
                  <CFormGroup>
                    <CLabel htmlFor="name">Tên</CLabel>
                    <CInput
                      className="is-valid"
                      onChange={(e) => setBranchName(e.target.value)}
                      id="name"
                      placeholder="Nhập tên công ty"
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="image">Logo</CLabel>
                    <CInputFile
                      onChange={selectFile}
                      custom={false}
                    ></CInputFile>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="address">Địa chỉ</CLabel>
                    <CInput
                      className="is-valid"
                      onChange={(e) => setAddress(e.target.value)}
                      id="address"
                      placeholder="Nhập địa chỉ"
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="latitude">Tọa độ</CLabel>
                    <CRow>
                      <CCol>
                        <CInput
                          className="is-valid"
                          onChange={(e) => setLatitude(e.target.value)}
                          id="latitude"
                          placeholder="Nhập latitude"
                          required
                        />
                      </CCol>
                      <CCol>
                        <CInput
                          className="is-valid"
                          onChange={(e) => setLongitude(e.target.value)}
                          id="longitude"
                          placeholder="Nhập longitude"
                          required
                        />
                      </CCol>
                    </CRow>
                  </CFormGroup>
                </CForm>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" color="primary" onClick={createBranch}>
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

export default AddBranchModal;
