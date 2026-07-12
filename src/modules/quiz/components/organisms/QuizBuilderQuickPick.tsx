import { Text } from '@/shared/components/atoms';
import { QuizBuilderAiCard } from '../molecules/QuizBuilderAiCard';
import { QuizBuilderTemplateCard } from '../molecules/QuizBuilderTemplateCard';

export interface QuizBuilderTemplateItem {
  key: string;
  title: string;
  description: string;
  metaText: string;
  icon: string;
  available: boolean;
}

interface QuizBuilderQuickPickProps {
  sectionTitle: string;
  sectionDescription: string;
  templates: QuizBuilderTemplateItem[];
  activeTemplateKey: string | null;
  aiTitle: string;
  aiDescription: string;
  aiBadgeText: string;
  onSelectTemplate: (key: string) => void;
}

export const QuizBuilderQuickPick = ({
  sectionTitle,
  sectionDescription,
  templates,
  activeTemplateKey,
  aiTitle,
  aiDescription,
  aiBadgeText,
  onSelectTemplate,
}: QuizBuilderQuickPickProps) => {
  return (
    <section className="mt-8">
      <Text variant="h4" className="!font-bold">
        {sectionTitle}
      </Text>
      <Text variant="body2" className="mt-1 !text-slate-500">
        {sectionDescription}
      </Text>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => (
          <QuizBuilderTemplateCard
            key={template.key}
            title={template.title}
            description={template.description}
            metaText={template.metaText}
            icon={template.icon}
            selected={activeTemplateKey === template.key}
            disabled={!template.available}
            onSelect={() => onSelectTemplate(template.key)}
          />
        ))}
      </div>

      <div className="mt-4">
        <QuizBuilderAiCard title={aiTitle} description={aiDescription} badgeText={aiBadgeText} />
      </div>
    </section>
  );
};
