import { MaterialIcon, Text } from '@/shared/components/atoms';

interface QuizDashboardStatCardProps {
  icon: string;
  value: string;
  label: string;
  tone?: 'default' | 'primary';
}

export const QuizDashboardStatCard = ({
  icon,
  value,
  label,
  tone = 'default',
}: QuizDashboardStatCardProps) => {
  const cardClass =
    tone === 'primary'
      ? 'bg-primary text-white border-primary/20'
      : 'bg-white text-slate-900 border-slate-200';

  const iconWrapClass =
    tone === 'primary'
      ? 'bg-white/20 text-white'
      : 'bg-indigo-50 text-primary';

  const labelClass = tone === 'primary' ? '!text-indigo-100' : '!text-slate-500';

  return (
    <article className={`rounded-2xl border p-4 shadow-sm ${cardClass}`}>
      <div className="mb-3 flex">
        <div className={`rounded-lg p-2 ${iconWrapClass}`}>
          <MaterialIcon icon={icon} size={18} />
        </div>
      </div>
      <Text variant="h4" className={tone === 'primary' ? '!text-white !font-black' : '!font-black'}>
        {value}
      </Text>
      <Text variant="small" className={`mt-1 ${labelClass}`}>
        {label}
      </Text>
    </article>
  );
};
