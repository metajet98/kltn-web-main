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

const AddCompanyModal = ({ isShowing, hide, onAddSuccess }) => {
  const [selectedFiles, setSelectedFile] = useState(undefined);
  const [companyName, setCompanyName] = useState();

  const selectFile = (event) => {
    setSelectedFile(event.target.files);
  };

  async function createCompany() {
    let formData = new FormData();
    formData.append("file", selectedFiles[0]);
    const logoUpload = await instance.post("api/utils/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(!logoUpload || !logoUpload.data) {
      return;
    }
    let companyData = {
      name: companyName,
      logo: logoUpload.data.data,
    };
    await instance.post("api/vehicle-company", companyData);
    hide();
    onAddSuccess();
  }

  return isShowing
    ? ReactDOM.createPortal(
        <CModal show={isShowing} onClose={hide}>
          <CModalHeader closeButton>
            <CModalTitle>Thêm công ty</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs="12">
                <CForm className="was-validated" action="" method="post">
                  <CFormGroup>
                    <CLabel htmlFor="name">Tên</CLabel>
                    <CInput
                      className="is-valid"
                      onChange={(e) => setCompanyName(e.target.value)}
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
                </CForm>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={createCompany}>
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

export default AddCompanyModal;
