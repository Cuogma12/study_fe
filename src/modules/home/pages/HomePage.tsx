'use client';

import React, { useEffect, useState } from 'react';
import { HomeLeftSidebar } from '../components/organisms/HomeLeftSidebar';
import { HomeFeed } from '../components/organisms/HomeFeed';
import { HomeRightSidebar } from '../components/organisms/HomeRightSidebar';
import { subjectService, Subject } from '@/shared/services/subject.service';

export const HomePage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<number | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

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

  const handleGradeChange = (grade: number) => {
    setSelectedGradeLevel((current) => (current === grade ? null : grade));
  };

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjectId((current) => (current === subjectId ? null : subjectId));
  };

  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-1 px-4 py-6 lg:gap-8 lg:px-10">
      <HomeLeftSidebar
        subjects={subjects}
        selectedGradeLevel={selectedGradeLevel}
        selectedSubjectId={selectedSubjectId}
        onGradeChange={handleGradeChange}
        onSubjectChange={handleSubjectChange}
      />

      <HomeFeed
        filters={{
          gradeLevel: selectedGradeLevel,
          subjectId: selectedSubjectId,
        }}
      />

      <HomeRightSidebar />
    </main>
  );
};
