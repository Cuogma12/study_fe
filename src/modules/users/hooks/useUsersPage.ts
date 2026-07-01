'use client';
import { useTranslations } from 'next-intl';

export const useUsersPage = () => {
	const t = useTranslations();

	const user = {
		name: 'Nguyễn Minh Tâm',
		role: 'PRO',
		followers: '1.2k',
		following: '458',
		points: '2,450',
		intro:
			'Sinh viên CNTT đam mê học hỏi về AI và phát triển phần mềm. Đang tập trung vào Machine Learning và Data Science.',
		school: 'Sinh viên tại ĐH Bách Khoa',
		location: 'Hà Nội, Việt Nam',
		website: 'github.com/minhtam_ai',
		level: 14,
		xpCurrent: 3200,
		xpTarget: 4000,
		questionsAsked: 128,
		answersGiven: 45,
	};

	const badges = [
		{ name: 'Top Contributor', icon: 'emoji_events', className: 'bg-amber-50 text-amber-500 dark:bg-amber-900/20' },
		{ name: 'AI Explorer', icon: 'psychology', className: 'bg-blue-50 text-blue-500 dark:bg-blue-900/20' },
		{ name: 'Fast Learner', icon: 'bolt', className: 'bg-green-50 text-green-500 dark:bg-green-900/20' },
		{ name: 'Problem Solver', icon: 'verified', className: 'bg-purple-50 text-purple-500 dark:bg-purple-900/20' },
	];

	const activities = [
		{
			type: 'quiz',
			title: 'Bạn đã hoàn thành bài kiểm tra',
			subject: 'Toán cao cấp',
			time: '2 giờ trước',
			visibility: 'Công khai',
			score: '9.5/10',
			summary: 'Nội dung: Ma trận, Hệ phương trình tuyến tính và Không gian vector...',
			likes: 24,
			comments: 8,
		},
		{
			type: 'answer',
			title: 'Đã trả lời một câu hỏi về',
			subject: 'Lập trình Python',
			time: 'Hôm qua',
			visibility: 'Đã được chấp nhận',
			question: 'Làm thế nào để tối ưu hóa Decorator trong Python cho AI models?',
			excerpt:
				'Để tối ưu, bạn nên sử dụng functools.wraps để bảo toàn metadata của function gốc...',
			likes: 156,
			comments: 12,
		},
	];

	const savedQuestions = [
		{
			title: 'Cách học ma trận nhanh trong 7 ngày?',
			subject: 'Toán cao cấp',
			status: 'Đang theo dõi',
		},
		{
			title: 'Lộ trình học React cho người mới bắt đầu',
			subject: 'Lập trình Web',
			status: 'Đã lưu',
		},
	];

	const suggestions = [
		{ name: 'Trần Hoàng An', meta: 'Chuyên Toán - 980 điểm' },
		{ name: 'Lê Thảo My', meta: 'AI Explorer - 1.4k điểm' },
		{ name: 'Phạm Đức Long', meta: 'Top Answerer - 760 điểm' },
	];

	const skills = ['Machine Learning', 'Data Science', 'Python', 'React', 'SQL', 'System Design'];

	return {
		t,
		user,
		badges,
		activities,
		savedQuestions,
		suggestions,
		skills,
	};
};