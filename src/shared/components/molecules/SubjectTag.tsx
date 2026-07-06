import React from 'react';
import { Tag } from '../atoms/Tag';
import {
  getSubjectBadgeClass,
  NEUTRAL_BADGE_CLASS,
} from '@/shared/constants/subjectBadgeThemes';

interface SubjectTagProps {
  name: string;
  slug?: string | null;
}

export const SubjectTag = ({ name, slug }: SubjectTagProps) => (
  <Tag className={getSubjectBadgeClass(slug)}>{name}</Tag>
);

interface NeutralTagProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const NeutralTag = ({ children, icon, className = '' }: NeutralTagProps) => (
  <Tag className={`${NEUTRAL_BADGE_CLASS} ${className}`.trim()} icon={icon}>
    {children}
  </Tag>
);
