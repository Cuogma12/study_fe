'use client';

import React from 'react';

export interface CommonDataTableColumn {
  key: string;
  label: string;
  className?: string;
}

interface CommonDataTableProps {
  columns: CommonDataTableColumn[];
  loading: boolean;
  loadingLabel: string;
  emptyLabel: string;
  rows: React.ReactNode;
}

export const CommonDataTable = ({
  columns,
  loading,
  loadingLabel,
  emptyLabel,
  rows,
}: CommonDataTableProps) => {
  const colSpan = columns.length;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] table-fixed border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${column.className ?? ''}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-sm text-slate-500" colSpan={colSpan}>
                  {loadingLabel}
                </td>
              </tr>
            ) : null}
            {!loading && !rows ? (
              <tr>
                <td className="px-4 py-6 text-sm text-slate-500" colSpan={colSpan}>
                  {emptyLabel}
                </td>
              </tr>
            ) : null}
            {!loading ? rows : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};
