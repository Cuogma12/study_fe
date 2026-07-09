import { Button, MaterialIcon, Text } from '@/shared/components/atoms';

interface QuizDashboardSidebarProps {
  createActionText: string;
  brandTitle: string;
  brandSubtitle: string;
  menus: {
    overview: string;
    myQuizzes: string;
    flashcards: string;
    progress: string;
    settings: string;
    help: string;
  };
  activeTab: 'overview' | 'my-quizzes';
  onGoOverview: () => void;
  onGoMyQuizzes: () => void;
  onCreate: () => void;
}

const SidebarItem = ({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
      active ? 'bg-indigo-100 text-primary' : 'text-slate-600'
    }`}
  >
    <MaterialIcon icon={icon} />
    <Text variant="body2" className={active ? '!text-primary !font-semibold' : '!text-slate-600'}>
      {label}
    </Text>
  </button>
);

export const QuizDashboardSidebar = ({
  createActionText,
  brandTitle,
  brandSubtitle,
  menus,
  activeTab,
  onGoOverview,
  onGoMyQuizzes,
  onCreate,
}: QuizDashboardSidebarProps) => {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-slate-50 p-4 lg:flex lg:flex-col">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg bg-primary p-1.5">
          <MaterialIcon icon="school" size={18} className="text-white" />
        </div>
        <div>
          <Text variant="body2" className="!font-bold !text-primary">
            {brandTitle}
          </Text>
          <Text variant="small" className="!text-slate-500">
            {brandSubtitle}
          </Text>
        </div>
      </div>

      <Button onClick={onCreate} className="mb-4 w-full">
        {createActionText}
      </Button>

      <div className="flex flex-col gap-2">
        <SidebarItem
          icon="dashboard"
          label={menus.overview}
          active={activeTab === 'overview'}
          onClick={onGoOverview}
        />
        <SidebarItem
          icon="quiz"
          label={menus.myQuizzes}
          active={activeTab === 'my-quizzes'}
          onClick={onGoMyQuizzes}
        />
        <SidebarItem icon="style" label={menus.flashcards} onClick={onGoOverview} />
        <SidebarItem icon="monitoring" label={menus.progress} onClick={onGoOverview} />
      </div>

      <div className="mt-auto flex flex-col gap-2 border-t border-slate-200 pt-4">
        <SidebarItem icon="settings" label={menus.settings} onClick={onGoOverview} />
        <SidebarItem icon="help" label={menus.help} onClick={onGoOverview} />
      </div>
    </aside>
  );
};
