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
  CSelect,
} from "@coreui/react";
import instance from "src/network/http_client";
import useModal from "src/views/useModal";

import { trackPromise } from "react-promise-tracker";
import AddStaffModal from "./add_staff_modal";

const fields = ["id", "fullName", "branch", "role", "action"];
const StaffPage = () => {
  const [branches, setBranches] = useState();

  const [spareParts, setSpareParts] = useState();

  const [selectedBranchId, setSelectedBranchId] = useState();

  const {
    isShowing: isShowingAddStaffModal,
    toggle: toggleAddStaffModal,
  } = useModal();

  useEffect(() => {
    trackPromise(loadBranches());
  }, []);

  async function loadBranches() {
    const response = await instance.get(`api/branch`);
    if (response && response.data) {
      setBranches(response.data.data);
    }
  }

  async function loadStaff(branchId) {
    const response = await instance.get(`api/staff?branchId=${branchId}`);
    if (response && response.data) {
      setSpareParts(response.data.data);
    }
  }

  function onSelectBranch(branchId) {
    setSelectedBranchId(branchId);
    loadStaff(branchId);
  }

  return (
    <div>
      <AddStaffModal
        onAddSuccess={() => loadStaff(selectedBranchId)}
        hide={toggleAddStaffModal}
        isShowing={isShowingAddStaffModal}
        branchId={selectedBranchId}
      />
      <CCol>
        <CCard>
          <CCardHeader>
            <CLabel>Danh sách nhân viên</CLabel>
            <CButton onClick={toggleAddStaffModal} className="float-right">
              Thêm
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CCol>
              <CRow>
                <CCol md="6">
                  <CSelect
                    custom
                    name="selectVehicleGroup"
                    id="cbbVehicleGroup"
                    onChange={(e) => onSelectBranch(e.target.value)}
                  >
                    <option>Chọn chi nhánh</option>
                    {branches?.map((e) => (
                      <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                  </CSelect>
                </CCol>
              </CRow>
              <br></br>
              <CDataTable
                items={spareParts}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  branch: (item) => (
                    <td>{item.branch?.name}</td>
                  ),
                  action: (item) => (
                    <td>
                      <CRow className="align-items-center">
                        <CButton size="sm" color="info">
                          Sửa
                        </CButton>
                      </CRow>
                    </td>
                  ),
                }}
              />
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  );
};

export default StaffPage;