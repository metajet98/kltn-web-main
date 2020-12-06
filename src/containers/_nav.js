export default [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Trung tâm"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Quản lý nhân viên",
    to: "/center/staff",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Quản lý bảo dưỡng",
    to: "/maintenance",
    icon: "cil-pencil",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Dịch vụ",
        to: "/center/service",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Danh mục kiểm tra",
        to: "/center/spare-part",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Quản lý chi nhánh",
    to: "/branch",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Quản lý xe",
    to: "/vehicle",
    icon: "cil-pencil",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Loại xe",
        to: "/vehicle/type",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Nhóm xe",
        to: "/vehicle/group",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Công ty xe",
        to: "/vehicle/company",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Thống kê",
    to: "/statistic",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Chi nhánh"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Lượt bảo dưỡng",
    to: "/maintenance",
    icon: "cil-pencil",
  },
];
