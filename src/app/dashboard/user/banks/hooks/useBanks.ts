"use client";

import { useQuery } from "@tanstack/react-query";

export type BankAccount = {
  bankName: string;
  branch: string;
  accountNumber: string;
  balance: number;
};

const generateBankAccounts = (count: number): BankAccount[] => {
  return Array.from({ length: count }, () => ({
    bankName: "الأهلي",
    branch: "مصر الجديدة",
    accountNumber: "4158512125894224",
    balance: 4582,
  }));
};

const allBankAccounts = generateBankAccounts(100);

export function useBankAccounts() {
  return useQuery({
    queryKey: ["bankAccounts"],
    queryFn: async () => {
      // In a real application, you would fetch from an API:
      // const { data } = await axios.get("/api/bank-accounts");
      return allBankAccounts;
    },
  });
}

// Column definitions for React Table
export const bankAccountColumns = [
  {
    accessorKey: "bankName",
    header: "اسم البنك",
  },
  {
    accessorKey: "branch",
    header: "الفرع",
  },
  {
    accessorKey: "accountNumber",
    header: "رقم الحساب",
  },
  {
    accessorKey: "balance",
    header: "رصيد",
  },
];
