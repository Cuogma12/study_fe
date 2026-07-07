'use client';

import React from 'react';

interface CommonDataTableProps {
  headers: string[];
  loading: boolean;
  loadingLabel: string;
  emptyLabel: string;
  colSpan: number;
  rows: React.ReactNode;
}

export const CommonDataTable = ({
  headers,
  loading,
  loadingLabel,
  emptyLabel,
  colSpan,
  rows,
}: CommonDataTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left">
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {header}
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
