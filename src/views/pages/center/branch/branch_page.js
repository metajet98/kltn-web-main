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
import AddBranchModal from './add_branch_modal';

import { trackPromise } from 'react-promise-tracker';

const fields = ['id', 'name', 'address', 'logo', "action"]

const BranchPage = () => {
    const [branches, setBranches] = useState();

    const { isShowing: isShowingAddBranchModal, toggle: toggleAddBranchModal } = useModal();

    useEffect(() => {
        trackPromise(
            loadBranches()
        );
    }, []);

    async function loadBranches() {
        const response = await instance.get("api/branch");
        if(response && response.data) {
            setBranches(response.data.data);
        }
    }

    async function deleteBranch(id) {
        await instance.delete(`api/branch/${id}`);
        loadBranches();
    }

    return (
        <div>
            <AddBranchModal onAddSuccess={() => loadBranches()} hide={toggleAddBranchModal} isShowing={isShowingAddBranchModal} />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CLabel>Danh sách chi nhánh</CLabel>
                            <CButton onClick={toggleAddBranchModal} className="float-right">Thêm</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={branches}
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
                                                <CButton size="sm" color="danger" onClick={() => deleteBranch(item.id)}>Xóa</CButton>
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

export default BranchPage;