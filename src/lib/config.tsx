import { SearchOption } from "@/components/SearchSelect";

export const userOptions = [
    {
        title: "المبيعات",
        subTitle: "إدارة الفواتير وعمليات البيع ومخزونات الحساب",
        Icon: "/user/sales.png",
        LinkUrl: "/dashboard/user/sales",
    },
    {
        title: "حركات الحسابات",
        subTitle: "عرض جميع حركات الحسابات المختلفة",

        Icon: "/user/transactions.png",
        LinkUrl: "/dashboard/user/sales",
    },
    {
        title: "قيود يومية",
        subTitle:
            "تسجيل كافة الحركات المالية اليومية بين الحسابات والمشتريات",
        Icon: "/user/dailyEntries.png",
        LinkUrl: "/dashboard/user/sales",
    },
    {
        title: "الخزينة والبنوك",
        subTitle: "إدارة الحركات المالية النقدية والحسابات البنكية",
        Icon: "/user/treasuryAndBanks.png",
        LinkUrl: "/dashboard/user/banks",
    },
    {
        title: "المشتريات",
        subTitle:
            "تسجيل مشتريات من الموردين وإدارة الفواتير المستلمة والمدفوعات حساب",
        Icon: "/user/purchases.png",
        LinkUrl: "/dashboard/user/purchases",
    },
    {
        title: "المخزن",
        subTitle: "إدارة المخازن ومتابعة الكميات المتواجدة من المنتجات",
        Icon: "/user/inventory.png",
        LinkUrl: "/dashboard/user/warehouses",
    },
    {
        title: "إدارة الموارد البشرية",
        subTitle: "إدارة الموظفين والرواتب والحضور والغياب",
        Icon: "/user/hr.png",
        LinkUrl: "/dashboard/user/sales",
    },
    {
        title: "التقارير",
        subTitle: "عرض وتحليل البيانات المالية من خلال تقارير مختلفة",
        Icon: "/user/reports.png",
        LinkUrl: "/dashboard/user/reports",
    },
    {
        title: "المصروفات",
        subTitle: "تسجيل جميع المصروفات مثل الرواتب والإيجارات والخدمات",
        Icon: "/user/expenses.png",
        LinkUrl: "/dashboard/user/expenses",
    },
    {
        title: "الموردين",
        subTitle: "إدارة ومراجعة بيانات الموردين والتزاماتهم المالية",
        Icon: "/user/supplier.png",
        LinkUrl: "/dashboard/user/suppliers",
    },
    {
        title: "العملاء",
        subTitle: "تحليل ومتابعة بيانات العملاء وحساباتهم المالية",
        Icon: "/user/client.png",
        LinkUrl: "/dashboard/user/clients",
    },
    {
        title: "طلبات الشراء",
        subTitle: "عرض وتتبع جميع طلبات الشراء وتفاصيلها المالية",
        Icon: "/user/checklist.png",
        LinkUrl: "/dashboard/user/orders",
    },
];

export const HrOptions:SearchOption[] = [
    {
      title: "home.employees", // Translation keys
      Icon: "/icons/employee.png",
      LinkUrl: "/dashboard/hr/employees",
    },
    {
      title: "home.employeeData",
      Icon: "/icons/emplyeeDetails.png",
      LinkUrl: "/dashboard/hr/employee-data",
    },
    {
      title: "home.financialGrades",
      Icon: "/icons/fainancalEmployeeDetails.png",
      LinkUrl: "/dashboard/hr/financial-grades",
    },
    {
      title: "home.workHours",
      Icon: "/icons/jobTime.png",
      LinkUrl: "/dashboard/hr/work-hours",
    },
    {
      title: "home.permission",
      Icon: "/icons/execuse.png",
      LinkUrl: "/dashboard/hr/permission",
    },
    {
      title: "home.breakTime",
      Icon: "/icons/breakTime.png",
      LinkUrl: "/dashboard/hr/break-time",
    },
    {
      title: "home.attendance",
      Icon: "/icons/Time.png",
      LinkUrl: "/dashboard/hr/attendance",
    },
    {
      title: "home.vacations",
      Icon: "/icons/warnings.png",
      LinkUrl: "/dashboard/hr/vacations",
    },
    // {
    //   title: "home.disciplinaryVacations",
    //   Icon: "/icons/warnings.png",
    //   DialogContentComponent: ({ closePopup }: { closePopup?: any }) => (
    //     <WarningPopUp closePopup={closePopup} />
    //   ),
    // },
  ] as const;
export const UserHrOptions:SearchOption[] =[
  {
    title: "ساعات دوام الموظف",
    Icon: "/userHr/Workinghours.png",
    LinkUrl: "/dashboard/userHr/work-hours",
  },
  {
    title: "yourData",
    Icon: "/userHr/details.png",
    LinkUrl: "/dashboard/userHr/employee-data",
  },
  {
    title: "vacations",
    Icon: "/userHr/vacations.png",
    LinkUrl: "/dashboard/userHr/vacations",
  },
  {
    title: "execuse",
    Icon: "/userHr/execuse.png",
    LinkUrl: "/dashboard/userHr/execuse",
  },
  {
    title: "سجل حضور الموظف",
    Icon: "/icons/Time.png",
    LinkUrl: "/dashboard/userHr/userAttendance",
  },
];
  
