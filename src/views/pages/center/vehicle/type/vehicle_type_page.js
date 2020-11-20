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
import AddTypeModal from "./add_type_modal";
import useModal from "src/views/useModal";

const fields = ["id", "typeName", "action"];

const VehicleTypePage = () => {
  const [types, setTypes] = useState();

  const {
    isShowing: isShowingAddTypeModal,
    toggle: toggleAddTypeModal,
  } = useModal();

  useEffect(() => {
    loadTypes();
  }, []);

  async function loadTypes() {
    const response = await instance.get("api/vehicle-type");
    if (response && response.data) {
      setTypes(response.data.data);
    }
  }

  async function deleteType(id) {
    await instance.delete(`api/vehicle-type/${id}`);
    loadTypes();
  }

  return (
    <div>
      <AddTypeModal
        onAddSuccess={() => loadTypes()}
        hide={toggleAddTypeModal}
        isShowing={isShowingAddTypeModal}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CLabel>Danh sách loại xe</CLabel>
              <CButton onClick={toggleAddTypeModal} className="float-right">
                Thêm
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={types}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  action: (item) => (
                    <td>
                      <CButton
                        color="danger"
                        onClick={() => deleteType(item.id)}
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

export default VehicleTypePage;
