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
import AddSparePartModal from "./add_spare_part_modal";

const fields = ["id", "name", "description", "action"];

const SparePartPage = () => {
  const [vehicleGroups, setVehicleGroups] = useState();

  const [spareParts, setSpareParts] = useState();

  const [selectedVehicleGroupId, setSelectedVehicleGroupId] = useState();

  const {
    isShowing: isShowingAddSparePartModal,
    toggle: toggleAddSparePartModal,
  } = useModal();

  useEffect(() => {
    trackPromise(loadVehicleGroup());
  }, []);

  async function loadVehicleGroup() {
    const response = await instance.get(`api/vehicle-group`);
    if (response && response.data) {
      setVehicleGroups(response.data.data);
    }
  }

  async function loadSpareParts(vehicleGroupId) {
    const response = await instance.get(`api/vehicle-group/${vehicleGroupId}/spare-part`);
    if (response && response.data) {
      setSpareParts(response.data.data);
    }
  }

  async function deleteSparePart(id, vehicleGroupId) {
    await instance.delete(`api/spare-part/${id}`);
    loadSpareParts(vehicleGroupId);
  }

  function onSelectVehicleGroup(vehicleGroupId) {
    setSelectedVehicleGroupId(vehicleGroupId);
    loadSpareParts(vehicleGroupId);
  }

  return (
    <div>
      <AddSparePartModal
        onAddSuccess={() => loadSpareParts(selectedVehicleGroupId)}
        hide={toggleAddSparePartModal}
        isShowing={isShowingAddSparePartModal}
        vehicleGroupId={selectedVehicleGroupId}
      />
      <CCol>
        <CCard>
          <CCardHeader>
            <CLabel>Danh mục kiểm tra</CLabel>
            <CButton onClick={toggleAddSparePartModal} className="float-right">
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
                    onChange={(e) => onSelectVehicleGroup(e.target.value)}
                  >
                    <option>Chọn xe</option>
                    {vehicleGroups?.map((e) => (
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
                      <CRow className="align-items-center">
                        <CButton size="sm" color="info">
                          Sửa
                        </CButton>
                        <CButton
                          size="sm"
                          color="danger"
                          onClick={() =>
                            deleteSparePart(item.id, selectedVehicleGroupId)
                          }
                        >
                          Xóa
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

export default SparePartPage;