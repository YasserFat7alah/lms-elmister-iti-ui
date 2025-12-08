export const mockPayouts = [
  {
    _id: "payout_001",
    teacher: {
      _id: "teacher_101",
      name: "John Doe",
      email: "john@example.com",
    },
    amount: 150,
    currency: "USD",
    status: "pending",
    requestedBy: {
      _id: "teacher_101",
      name: "John Doe",
    },
    approvedBy: null,
    teacherNote: "Please process my payout for this month.",
    adminNote: "",
    paidAt: null,
    rejectedAt: null,
    createdAt: "2025-01-12T10:20:00Z",
  },

  {
    _id: "payout_002",
    teacher: {
      _id: "teacher_102",
      name: "Sarah Ali",
      email: "sarah@example.com",
    },
    amount: 320,
    currency: "USD",
    status: "approved",
    requestedBy: {
      _id: "teacher_102",
      name: "Sarah Ali",
    },
    approvedBy: {
      _id: "admin_01",
      name: "Admin User",
    },
    teacherNote: "Payment for December classes.",
    adminNote: "Approved and scheduled for transfer.",
    paidAt: null,
    rejectedAt: null,
    createdAt: "2025-01-10T08:50:00Z",
  },

  {
    _id: "payout_003",
    teacher: {
      _id: "teacher_103",
      name: "Michael Smith",
      email: "michael@example.com",
    },
    amount: 200,
    currency: "USD",
    status: "paid",
    requestedBy: {
      _id: "teacher_103",
      name: "Michael Smith",
    },
    approvedBy: {
      _id: "admin_01",
      name: "Admin User",
    },
    teacherNote: "Thanks!",
    adminNote: "Transferred successfully.",
    paidAt: "2025-01-05T14:30:00Z",
    rejectedAt: null,
    createdAt: "2025-01-03T09:30:00Z",
  },

  {
    _id: "payout_004",
    teacher: {
      _id: "teacher_104",
      name: "Emma Johnson",
      email: "emma@example.com",
    },
    amount: 180,
    currency: "USD",
    status: "rejected",
    requestedBy: {
      _id: "teacher_104",
      name: "Emma Johnson",
    },
    approvedBy: null,
    teacherNote: "Monthly payment request.",
    adminNote: "Teacher balance does not match.",
    paidAt: null,
    rejectedAt: "2025-01-14T16:00:00Z",
    createdAt: "2025-01-11T11:00:00Z",
  },
];
