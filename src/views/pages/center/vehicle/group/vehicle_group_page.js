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
import AddGroupModal from './add_group_modal';
import useModal from 'src/views/useModal';

const fields = ['id', 'name','image', "action"]

const VehicleGroupPage = () => {
    const [groups, setGroups] = useState();

    const { isShowing: isShowingAddGroupModal, toggle: toggleAddGroupModal } = useModal();

    useEffect(() => {
        loadGroups()
    }, []);

    async function loadGroups() {
        const response = await instance.get("api/vehicle-group");
        if(response && response.data) {
            setGroups(response.data.data);
        }
    }

    async function deleteGroup(id) {
        await instance.delete(`api/vehicle-group/${id}`);
        loadGroups();
    }

    return (
        <div>
            <AddGroupModal onAddSuccess={() => loadGroups()} hide={toggleAddGroupModal} isShowing={isShowingAddGroupModal} />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CLabel>Danh sách nhóm xe</CLabel>
                            <CButton onClick={toggleAddGroupModal} className="float-right">Thêm</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={groups}
                                fields={fields}
                                itemsPerPage={5}
                                pagination
                                scopedSlots={{
                                    'image':
                                        (item) => (
                                            <td>
                                                <img height={100} width={100} src={item.image} className="img-fluid" alt="logo" />
                                            </td>
                                        ),
                                    'action':
                                        (item) => (
                                            <td>
                                                <CRow className="align-items-center">
                                                    <CButton color="info">Sửa</CButton>
                                                    <CButton color="danger" onClick={() => deleteGroup(item.id)}>Xóa</CButton>
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

export default VehicleGroupPage;