import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import instance from 'src/network/http_client';
import LocalStorage from 'src/storage/local_storage';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {
  let history = useHistory();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Đăng nhập</h1>
                    <p className="text-muted">Đăng nhập tài khoản của bạn</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={(e) => setPhoneNumber(e.target.value)} id="txtPhoneNumber" type="text" placeholder="Số điện thoại" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={(e) => setPassword(e.target.value)} id="txtPassword" type="password" placeholder="Mật khẩu" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={onLogin} color="primary" className="px-4">Đăng nhập</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Quên mật khẩu?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Đăng kí</h2>
                    <p>Tạo tài khoản nhân viên để tham gia vào hệ thống.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Đăng kí ngay!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )

  

  function onLogin() {
    console.log(phoneNumber, password);
    instance.post('api/login', {
      PhoneNumber: phoneNumber, 
      Password: password
    }).then(function (response) {
      console.log(response); 
      LocalStorage.setToken(response.data);
      toast.info("Đăng nhập thành công!");
      history.push('/');
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default Login
