import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CLabel,
    CRow,
} from '@coreui/react'
import instance from 'src/network/http_client';
import useModal from 'src/views/useModal';

import { trackPromise } from 'react-promise-tracker';

const fields = ['id', 'name', 'description', "action"]

const SparePartPage = () => {
    const [vehicles, setVehicles] = useState();

    const [spareParts, setSpareParts] = useState();

    const { isShowing: isShowingAddSparePartModal, toggle: toggleAddSparePartModal } = useModal();

    useEffect(() => {
        trackPromise(
            await loadVehicleGroup(),
            await loadSpareParts()
        );
    }, []);

    async function loadVehicleGroup() {
        const response = await instance.get(`api/vehicle-group`);
        if(response && response.data) {
            setVehicles(response.data.data);
        }
    }

    async function loadSpareParts(vehicleId) {
        const response = await instance.get(`api/${vehicleId}/spare-part`);
        if(response && response.data) {
            setSpareParts(response.data.data);
        }
    }

    async function deleteSparePart(id, vehicleId) {
        await instance.delete(`api/${vehicleId}/spare-part/${id}`);
        loadSpareParts(vehicleId);
    }

    return (
        <div>
            <AddSparePartModal onAddSuccess={() => loadSparePartes()} hide={toggleAddSparePartModal} isShowing={isShowingAddSparePartModal} />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CLabel>Danh sách chi nhánh</CLabel>
                            <CButton onClick={toggleAddSparePartModal} className="float-right">Thêm</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={SparePartes}
                                fields={fields}
                                itemsPerPage={5}
                                pagination
                                scopedSlots={{
                                    'logo':
                                        (item) => (
                                            <td>
                                                <img height={100} width={100} src={item.logo} className="img-fluid" alt="logo" />
                                            </td>
                                        ),
                                    'action':
                                        (item) => (
                                            <td>
                                                <CRow className="align-items-center">
                                                    <CButton size="sm" color="info">Sửa</CButton>
                                                    <CButton size="sm" color="danger" onClick={() => deleteSparePart(item.id)}>Xóa</CButton>
                                                </CRow>
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
}

export default SparePartPage;