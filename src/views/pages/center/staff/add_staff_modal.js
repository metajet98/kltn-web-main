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
  CForm,
  CRow,
  CCol,
  CLabel,
  CButton,
  CSelect,
} from "@coreui/react";

const AddStaffModal = ({ isShowing, hide, onAddSuccess, branchId }) => {
  const [fullName, setFullName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [birthday, setBirthday] = useState();
  const [password, setPassword] = useState();
  const [staffType, setStaffType] = useState();

  async function createStaff() {
    let staffParams = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      address: address,
      birthday: birthday,
      password: password,
      branchId: branchId,
      role: staffType,
    };
    await instance.post(`api/staff`, staffParams);
    hide();
    onAddSuccess();
  }

  return isShowing
    ? ReactDOM.createPortal(
        <CModal show={isShowing} onClose={hide}>
          <CModalHeader closeButton>
            <CModalTitle>Thêm nhân viên</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs="12">
                <CForm className="was-validated" action="" method="post">
                  <CFormGroup>
                    <CLabel htmlFor="name">Tên</CLabel>
                    <CInput
                      className="is-valid"
                      onChange={(e) => setFullName(e.target.value)}
                      id="name"
                      placeholder="Nhập tên"
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="number">Số điện thoại</CLabel>
                    <CInput
                      className="is-valid"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      id="phone"
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="number">Số email</CLabel>
                    <CInput
                      className="is-valid"
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      placeholder="Nhập email"
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="text">Địa chỉ</CLabel>
                    <CInput
                      className="is-valid"
                      onChange={(e) => setAddress(e.target.value)}
                      id="address"
                      placeholder="Nhập địa chỉ"
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="text">Ngày sinh</CLabel>
                    <CInput
                      className="is-valid"
                      onChange={(e) => setBirthday(e.target.value)}
                      id="birthday"
                      placeholder="Nhập ngày sinh"
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Loại nhân viên</CLabel>
                    <CSelect
                      custom
                      onChange={(e) => setStaffType(e.target.value)}
                    >
                      <option key="StaffDesk" value="StaffDesk">
                        Nhân viên trực quầy
                      </option>
                      <option key="StaffMaintenance" value="StaffMaintenance">
                        Nhân viên bảo dưỡng
                      </option>
                    </CSelect>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="password">Mật khẩu</CLabel>
                    <CInput
                      className="is-valid"
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      placeholder="Nhập mật khẩu"
                      required
                    />
                  </CFormGroup>
                </CForm>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={createStaff}>
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

export default AddStaffModal;
