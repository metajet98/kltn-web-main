import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const VehicleCompanyPage = React.lazy(() => import('./views/pages/center/vehicle/company/vehicle_company_page'))
const VehicleTypePage = React.lazy(() => import('./views/pages/center/vehicle/type/vehicle_type_page'))
const VehicleGroupPage = React.lazy(() => import('./views/pages/center/vehicle/group/vehicle_group_page'))

const BranchPage = React.lazy(() => import('./views/pages/center/branch/branch_page'))
const SparePartPage = React.lazy(() => import('./views/pages/center/spare_part/spare_part_page'))
const MaintenanceServicePage = React.lazy(() => import('./views/pages/center/services/maintenance_service_page'))
const StaffPage = React.lazy(() => import('./views/pages/center/staff/staff_page'))

const SchedulePage = React.lazy(() => import('./views/pages/branch/schedule/schedule_page'))
const MaintenancePage = React.lazy(() => import('./views/pages/branch/maintenance/maintenance_page'))
const TopicPage = React.lazy(() => import('./views/pages/branch/topic/topic_page'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  

  { path: '/vehicle/company', exact: true, name: 'Công ty xe', component: VehicleCompanyPage },
  { path: '/vehicle/type', exact: true, name: 'Loại xe', component: VehicleTypePage },
  { path: '/vehicle/group', exact: true, name: 'Nhóm xe', component: VehicleGroupPage },

  { path: '/branch', exact: true, name: 'Chi nhánh', component: BranchPage },
  { path: '/center/spare-part', exact: true, name: 'Phụ tùng', component: SparePartPage },
  { path: '/center/service', exact: true, name: 'Dịch vụ', component: MaintenanceServicePage },
  { path: '/center/staff', exact: true, name: 'Nhân viên', component: StaffPage },

  { path: '/branch/schedule', exact: true, name: 'Lịch hẹn', component: SchedulePage },
  { path: '/branch/maintenance', exact: true, name: 'Lượt bảo dưỡng', component: MaintenancePage },
  { path: '/topic', exact: true, name: 'Hỏi đáp', component: TopicPage },
];

export default routes;
