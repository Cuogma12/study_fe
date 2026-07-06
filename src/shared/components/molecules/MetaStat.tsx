import React from 'react';
import { MaterialIcon, Text } from '../atoms';

interface MetaStatProps {
  icon: string;
  value: number | string;
}

export const MetaStat = ({ icon, value }: MetaStatProps) => (
  <Text
    as="span"
    variant="small"
    className="inline-flex items-center gap-1 !font-normal !text-slate-500"
  >
    <MaterialIcon icon={icon} size="text-sm" />
    {value}
  </Text>
);
