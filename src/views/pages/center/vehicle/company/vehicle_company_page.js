import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CLabel,
  CRow,
} from "@coreui/react";
import instance from "src/network/http_client";
import AddCompanyModal from "./add_company_modal";
import useModal from "src/views/useModal";

const fields = ["id", "name", "logo", "action"];

const VehicleCompanyPage = () => {
  const [companies, setCompanies] = useState();

  const {
    isShowing: isShowingAddCompanyModal,
    toggle: toggleAddCompanyModal,
  } = useModal();

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    const response = await instance.get("api/vehicle-company");
    if (response && response.data) {
      setCompanies(response.data.data);
    }
  }

  async function deleteCompany(id) {
    await instance.delete(`api/vehicle-company/${id}`);
    loadCompanies();
  }

  return (
    <div>
      <AddCompanyModal
        onAddSuccess={() => loadCompanies()}
        hide={toggleAddCompanyModal}
        isShowing={isShowingAddCompanyModal}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CLabel>Danh sách công ty</CLabel>
              <CButton onClick={toggleAddCompanyModal} className="float-right">
                Thêm
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={companies}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  logo: (item) => (
                    <td>
                      <img
                        height={100}
                        width={100}
                        src={item.logo}
                        className="img-fluid"
                        alt="logo"
                      />
                    </td>
                  ),
                  action: (item) => (
                    <td>
                      <CButton
                        color="danger"
                        onClick={() => deleteCompany(item.id)}
                      >
                        Xóa
                      </CButton>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default VehicleCompanyPage;
