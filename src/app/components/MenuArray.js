let url1 =process.env.MONGODB_URI;
alert(url1);
const menuItems = [
    {
      title: "Dashboard",
      subItems: [
        {
          label: "Dashboard",
          href: "https://sowtex.com/control-panel/sowtex-dashboard",
        },
      ],
    },
    {
      title: "Member Management",
      subItems: [
        {
          label: "Add New Member",
          href: "https://sowtex.com/control-panel/add-new-member",
        },
        {
          label: "Trial Members",
          href: "https://sowtex.com/control-panel/trial-members",
        },
        {
          label: "Paid Members",
          href: "https://sowtex.com/control-panel/paid-members",
        },
        {
          label: "Pending Approvals",
          href: "https://sowtex.com/control-panel/pending-approvals",
        },
        {
          label: "Pre Registration",
          href: "https://sowtex.com/control-panel/pre-registration",
        },
        {
          label: "Recycle Pre Registration",
          href: "https://sowtex.com/control-panel/Recycle-Pre-Registration",
        },
      ],
    },
    {
      title: "Product List",
      subItems: [
        {
          label: "All Products",
          href: "https://sowtex.com/control-panel/all-products",
        },
        {
          label: "Add New Products",
          href: "https://sowtex.com/control-panel/add-new-products",
        },
      ],
    },
    {
      title: "Enquiry",
      subItems: [
        {
          label: "Manage Enquiry",
          href: "https://sowtex.com/control-panel/manage",
        },
        { label: "Add New", href: "https://sowtex.com/control-panel/add-new" },
        {
          label: "Open Enquiry",
          href: "https://sowtex.com/control-panel/open-enquiry",
        },
      ],
    },
    {
      title: "Sowtex Management",
      subItems: [
        { label: "Roles", href: "https://sowtex.com/control-panel/roles" },
        {
          label: "User List",
          href: "https://sowtex.com/control-panel/user-list",
        },
      ],
    },
    {
      title: "Available Capacity",
      subItems: [
        {
          label: "Idle Capacity",
          href: "https://sowtex.com/control-panel/search-companies",
        },
      ],
    },
    {
      title: "Ready Stock",
      subItems: [
        {
          label: "Manage Stock",
          href: "https://sowtex.com/control-panel/manage-admin-stock",
        },
        {
          label: "Add Stock",
          href: "https://sowtex.com/control-panel/add-admin-stock",
        },
        {
          label: "Stock Movement",
          href: "https://sowtex.com/control-panel/stock-movement",
        },
      ],
    },
    {
      title: "Category Master",
      subItems: [
        {
          label: "Add New",
          href: "https://sowtex.com/control-panel/add-new-category",
        },
        {
          label: "Assign Categories",
          href: "https://sowtex.com/control-panel/assign-categories",
        },
        {
          label: "Manage Categories",
          href: "https://sowtex.com/control-panel/manage-categories",
        },
      ],
    },
    {
      title: "Shortlisted",
      subItems: [
        {
          label: "Products",
          href: "https://sowtex.com/control-panel/shortlisted-products",
        },
        { label: "Catalogs", href: "https://sowtex.com/control-panel/catalogs" },
        {
          label: "Companies",
          href: "https://sowtex.com/control-panel/companies",
        },
        { label: "Stocks", href: "https://sowtex.com/control-panel/stocks" },
      ],
    },
    {
      title: "Support Center",
      subItems: [
        {
          label: "All Tickets",
          href: "https://sowtex.com/control-panel/all-tickets",
        },
      ],
    },
    {
      title: "Manage Vendor Request",
      subItems: [
        {
          label: "Vendor Request",
          href: "https://sowtex.com/control-panel/vendor-request",
        },
      ],
    },
    {
      title: "ECatalog",
      subItems: [
        {
          label: "Manage Catalogs",
          href: "https://sowtex.com/control-panel/manage-catalogs",
        },
        {
          label: "Add New",
          href: "https://sowtex.com/control-panel/add-new-catalog",
        },
      ],
    },
    {
      title: "Elearning",
      subItems: [
        {
          label: "Manage E-learning",
          href: "https://sowtex.com/control-panel/manage-elearning",
        },
        {
          label: "Add E-learning",
          href: "https://sowtex.com/control-panel/add-elearning",
        },
      ],
    },
    {
      title: "Manage Vendor",
      subItems: [
        {
          label: "Add Vendor",
          href: "https://sowtex.com/control-panel/Search-Vendor",
        },
      ],
    },
    {
      title: "Banner Management",
      subItems: [
        {
          label: "Add-New",
          href: "https://sowtex.com/control-panel/add-new-banner",
        },
        {
          label: "Manage",
          href: "https://sowtex.com/control-panel/manage-banner",
        },
        {
          label: "Google Review",
          href: "https://sowtex.com/control-panel/google-review",
        },
        {
          label: "Manage Google Review",
          href: "https://sowtex.com/control-panel/manage-google-review",
        },
      ],
    },
    {
      title: "Reports",
      subItems: [
        { label: "Reports", href: "https://sowtex.com/control-panel/reports" },
      ],
    },
    {
      title: "Membership Plan",
      subItems: [
        {
          label: "Membership-Plans",
          href: "https://sowtex.com/control-panel/membership-plans",
        },
      ],
    },
    {
      title: "Manage Content",
      subItems: [
        {
          label: "Manage Content",
          href: "https://sowtex.com/control-panel/manage-content",
        },
      ],
    },
  ];
  export default menuItems;