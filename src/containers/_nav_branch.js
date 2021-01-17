export default [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Trung tâm"],
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
    to: "/branch/maintenance",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Lịch hẹn",
    to: "/branch/schedule",
    icon: "cil-pencil",
  },
];
