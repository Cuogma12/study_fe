export interface QuizBuilderTemplateDef {
  key: string;
  subjectSlug: string;
  topicSlug?: string;
  gradeLevel: 10 | 11 | 12;
  limit: number;
  icon: string;
}

export const QUIZ_BUILDER_TEMPLATE_DEFS: QuizBuilderTemplateDef[] = [
  {
    key: 'math_10_quadratic',
    subjectSlug: 'toan',
    topicSlug: 'phuong-trinh-bac-hai',
    gradeLevel: 10,
    limit: 10,
    icon: 'calculate',
  },
  {
    key: 'math_12_logarithm',
    subjectSlug: 'toan',
    topicSlug: 'logarit',
    gradeLevel: 12,
    limit: 15,
    icon: 'functions',
  },
  {
    key: 'math_12_review',
    subjectSlug: 'toan',
    gradeLevel: 12,
    limit: 20,
    icon: 'school',
  },
  {
    key: 'physics_11_dc',
    subjectSlug: 'vat-ly',
    topicSlug: 'dong-dien-khong-doi',
    gradeLevel: 11,
    limit: 10,
    icon: 'bolt',
  },
  {
    key: 'chemistry_10_ion',
    subjectSlug: 'hoa-hoc',
    topicSlug: 'phan-ung-ion',
    gradeLevel: 10,
    limit: 10,
    icon: 'science',
  },
  {
    key: 'english_10_tense',
    subjectSlug: 'tieng-anh',
    topicSlug: 'thi-hien-tai',
    gradeLevel: 10,
    limit: 10,
    icon: 'translate',
  },
  {
    key: 'history_12_world_war',
    subjectSlug: 'lich-su',
    topicSlug: 'chien-tranh-the-gioi',
    gradeLevel: 12,
    limit: 15,
    icon: 'history_edu',
  },
];
