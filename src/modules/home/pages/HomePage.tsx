'use client';

import React, { useEffect, useState } from 'react';
import { HomeLeftSidebar } from '../components/organisms/HomeLeftSidebar';
import { HomeFeed } from '../components/organisms/HomeFeed';
import { HomeRightSidebar } from '../components/organisms/HomeRightSidebar';
import { useHomeFilters } from '../hooks/useHomeFilters';
import { subjectService, Subject } from '@/shared/services/subject.service';

export const HomePage = () => {
  const {
    filters,
    setFilters,
    toggleGrade,
    toggleSubject,
  } = useHomeFilters();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await subjectService.getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error('Failed to load subjects', error);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 px-4 lg:gap-0 lg:px-10">
      <HomeLeftSidebar
        subjects={subjects}
        selectedGradeLevel={filters.gradeLevel}
        selectedSubjectId={filters.subjectId}
        onGradeChange={toggleGrade}
        onSubjectChange={toggleSubject}
      />

      <HomeFeed
        filters={filters}
        subjects={subjects}
        filterDrawerOpen={filterDrawerOpen}
        onFilterDrawerOpenChange={setFilterDrawerOpen}
        onSetFilters={setFilters}
      />

      <HomeRightSidebar />
    </main>
  );
};
