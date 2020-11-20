import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
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
  CSelect,
} from "@coreui/react";

const AddGroupModal = ({ isShowing, hide, onAddSuccess }) => {
  const [selectedFiles, setSelectedFile] = useState(undefined);
  const [groupName, setGroupName] = useState();
  const [vehicleCompanyId, setVehicleCompanyId] = useState();
  const [vehicleTypeId, setVehicleTypeId] = useState();

  const [vehicleTypes, setVehicleTypes] = useState();
  const [vehicleCompanies, setVehicleCompanies] = useState();

  const selectFile = (event) => {
    setSelectedFile(event.target.files);
  };

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    var companiesData = await instance.get("api/vehicle-company");
    var vehicleTypesData = await instance.get("api/vehicle-type");

    await setVehicleTypes(vehicleTypesData.data.data);
    await setVehicleCompanies(companiesData.data.data);

    console.log(vehicleTypes, vehicleCompanies);
  }

  async function createGroup() {
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
    let groupData = {
      name: groupName,
      image: logoUpload.data.data,
      vehicleTypeId: parseInt(vehicleTypeId),
      vehicleCompanyId: parseInt(vehicleCompanyId),
      capacity: 123
    };
    await instance.post("api/vehicle-group", groupData);
    hide();
    onAddSuccess();
  }

  return isShowing
    ? ReactDOM.createPortal(
        <CModal show={isShowing} onClose={hide}>
          <CModalHeader closeButton>
            <CModalTitle>Thêm nhóm xe</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs="12">
                <CForm action="" method="post">
                  <CFormGroup>
                    <CLabel htmlFor="name">Tên</CLabel>
                    <CInput
                      onChange={(e) => setGroupName(e.target.value)}
                      id="name"
                      placeholder="Nhập tên nhóm xe"
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CSelect
                      custom
                      name="selectCompany"
                      id="cbbCompany"
                      onChange={(e) => setVehicleCompanyId(e.target.value)}
                    >
                      <option>Chọn hãng xe</option>
                      {vehicleCompanies.map((e) => (
                        <option value={e.id}>{e.name}</option>
                      ))}
                    </CSelect>
                  </CFormGroup>
                  <CFormGroup>
                    <CSelect
                      custom
                      name="selectVehicleType"
                      id="cbbVehicleType"
                      onChange={(e) => setVehicleTypeId(e.target.value)}
                    >
                      <option>Chọn loại xe</option>
                      {vehicleTypes.map((e) => (
                        <option value={e.id}>{e.typeName}</option>
                      ))}
                    </CSelect>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="image">Ảnh</CLabel>
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
            <CButton color="primary" onClick={createGroup}>
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

export default AddGroupModal;
