import React, { useEffect, useRef, useState } from "react";
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
  CModal,
} from "@coreui/react";
import instance from "src/network/http_client";
import useModal from "src/views/useModal";

import { trackPromise } from "react-promise-tracker";
import AddServiceModal from "./add_service_modal";
import UpdateBranchPriceModal from "./update_branch_price_modal";

const MaintenanceServicePage = () => {
  const [services, setServices] = useState();
  const [branchPrices, setBranchPrices] = useState();

  let selectedVehicleGroupId = useRef(null);
  let selectedBranchId = useRef(null);

  const [vehicleGroups, setVehicleGroups] = useState();
  const [branches, setBranches] = useState();

  const [currentUpdatingPrice, setCurrentUpdatingPrice] = useState();

  const {
    isShowing: isShowingAddServiceModal,
    toggle: toggleAddServiceModal,
  } = useModal();

  const {
    isShowing: isShowingUpdateBranchPriceModal,
    toggle: toggleUpdatePriceModal,
  } = useModal();

  useEffect(() => {
    trackPromise(loadData());
  }, []);

  async function loadData() {
    await loadBranches();
    await loadVehicleGroups();
  }

  async function loadVehicleGroups() {
    const response = await instance.get(`api/vehicle-group`);
    if (response && response.data) {
      setVehicleGroups(response.data.data);
    }
  }

  async function loadBranches() {
    const response = await instance.get(`api/branch`);
    if (response && response.data) {
      setBranches(response.data.data);
    }
  }

  async function loadServices() {
    const response = await instance.get(`api/maintenance/service`, {
      params: {
        vehicleGroupId: selectedVehicleGroupId.current,
      },
    });
    if (response && response.data) {
      setServices(response.data.data);
    }
  }

  async function loadBranchesPrices() {
    const response = await instance.get(
      `api/branch/${selectedBranchId.current}/price`,
      {
        params: {
          vehicleGroupId: selectedVehicleGroupId.current,
        },
      }
    );
    if (response && response.data) {
      setBranchPrices(response.data.data);
    }
  }

  async function deleteServices(serviceId) {
    await instance.delete(`api/maintenance/service/${serviceId}`);
    loadServices();
  }

  async function deleteBranchPrice(branchPriceId) {
    await instance.delete(
      `api/branch/${selectedBranchId.current}/price/${branchPriceId}`
    );
    loadBranchesPrices();
  }

  function onSelectVehicleGroup(vehicleGroupId) {
    selectedVehicleGroupId.current = vehicleGroupId;
    loadServices();
  }

  function onSelectBranch(branchId) {
    selectedBranchId.current = branchId;
    loadBranchesPrices();
  }

  function onClearBranch() {
    selectedBranchId.current = undefined;
    document.getElementById("cbbBranch").selectedIndex = 0;
    setBranchPrices(undefined);
    loadServices();
  }

  return (
    <div>
      <AddServiceModal
        onAddSuccess={() => loadServices()}
        hide={toggleAddServiceModal}
        isShowing={isShowingAddServiceModal}
        vehicleGroupId={selectedVehicleGroupId.current}
      />
      <UpdateBranchPriceModal
        onUpdateSuccess={() => loadBranchesPrices()}
        hide={toggleUpdatePriceModal}
        isShowing={isShowingUpdateBranchPriceModal}
        initPriceData={currentUpdatingPrice}
        branchId={selectedBranchId.current}
      />
      <CCol>
        <CCard>
          <CCardHeader>
            <CLabel>Danh sách dịch vụ</CLabel>
            <CButton onClick={toggleAddServiceModal} className="float-right">
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
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
                <CCol md="5">
                  <CSelect
                    custom
                    name="selectBranch"
                    id="cbbBranch"
                    onChange={(e) => onSelectBranch(e.target.value)}
                  >
                    <option>Chọn chi nhánh</option>
                    {branches?.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
                <CCol md="1">
                  <CButton className="float-right" onClick={onClearBranch}>
                    Xóa lọc
                  </CButton>
                </CCol>
              </CRow>
              <br></br>
              <CDataTable
                items={branchPrices ?? services}
                fields={
                  branchPrices
                    ? [
                        "id",
                        "serviceId",
                        "name",
                        "description",
                        "laborCost",
                        "sparePartPrice",
                        "action",
                      ]
                    : ["id", "name", "description", "action"]
                }
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  id: (item) => {
                    if (item.id != 0) {
                      return <td>{item.id}</td>;
                    } else {
                      return <td>-</td>;
                    }
                  },
                  serviceId: (item) => {
                    if (item.serviceId) {
                      return <td>{item.serviceId}</td>;
                    } else {
                      return <td>-------</td>;
                    }
                  },
                  laborCost: (item) => {
                    if (item.laborCost) {
                      return <td>{item.laborCost}</td>;
                    } else {
                      return <td>-------</td>;
                    }
                  },
                  price: (item) => {
                    if (item.price) {
                      return <td>{item.price}</td>;
                    } else {
                      return <td>-------</td>;
                    }
                  },
                  action: (item) => {
                    if (item.serviceId) {
                      return (
                        <td>
                          <CButton size="sm" color="info" onClick={() => {
                            setCurrentUpdatingPrice(item);
                            toggleUpdatePriceModal();
                          }}>
                            Sửa
                          </CButton>
                        </td>
                      );
                    } else {
                      return (
                        <td>
                          <CButton
                              size="sm"
                              color="danger"
                              onClick={() => deleteServices(item.id)}
                            >
                              Xóa
                            </CButton>
                        </td>
                      );
                    }
                  },
                }}
              />
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  );
};

export default MaintenanceServicePage;
