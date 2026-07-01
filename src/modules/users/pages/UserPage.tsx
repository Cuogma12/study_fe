'use client';

import React from 'react';
import { useUsersPage } from '@/modules/users/hooks/useUsersPage';
import { Button, Text, TextLink } from '@/shared/components/atoms';
import { SchoolIcon } from '@/shared/components/atoms/icon';

export const UserPage = () => {
	const { t, user, badges, activities, savedQuestions, suggestions, skills } = useUsersPage();

	const progress = Math.round((user.xpCurrent / user.xpTarget) * 100);

	return (
		<div className="min-h-screen bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-100">
			<div className="sticky top-0 z-40 border-b border-primary/10 bg-white/85 backdrop-blur-md dark:bg-slate-950/80">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
					<div className="flex items-center gap-3 text-primary">
						<div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
							<SchoolIcon size={20} className="text-primary" />
						</div>
						<div>
							<Text variant="h6" weight="bold" className="!text-slate-900 dark:!text-white">
								{t('common.app_name')}
							</Text>
							<Text variant="caption" className="!text-slate-500 dark:!text-slate-400">
								{t('users.subtitle')}
							</Text>
						</div>
					</div>

					<div className="hidden items-center gap-3 md:flex">
						<div className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
							{t('users.search_placeholder')}
						</div>
						<Button variant="ghost" size="sm">
							<span className="material-symbols-outlined text-[20px]">notifications</span>
						</Button>
						<div className="h-9 w-9 overflow-hidden rounded-full border border-primary/20 bg-slate-200">
							<img
								alt={t('users.avatar_alt')}
								className="h-full w-full object-cover"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqnnzHa3k2gd43VflH9jP7SDwTaIj1ZWCMy3G43zTlHDvjfqKMwyi1z8kbAG2GwPTd03BDpdtlI01AHve0tAP8bKvevINy3L5JkaKizG_O-LeSpVar37t7grG7eAC4NXtISCSVqvx2XpxjvYmaT2aYJe3WRfynJv0R8CFNHbRTOF8JWnCnWlcZluqeQnEg6YUyPmNm0yTc-bViTShbXP30LKwzUREyBWEesoCw-63cqtoJNGnoHIwctrGNahHKtX4zrpfl7Rj8TRA"
							/>
						</div>
					</div>
				</div>
			</div>

			<main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<section className="mb-6 overflow-hidden rounded-2xl border border-primary/5 bg-white shadow-sm dark:bg-slate-900">
					<div className="relative h-48 bg-slate-200 md:h-64 dark:bg-slate-800">
						<img
							alt={t('users.cover_alt')}
							className="h-full w-full object-cover"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbBGYnM2oEMO091O1aJdVBbGLSVOK23Zs0Yk5Z8PfQxOTqRaUdzmWEOsSPb5HkIvlg3EEduPUKADSee5alU6wyQ4KIEIwYRx0jJD0kg_oYttHMFjzbx3ihqQ7UcVZckAgBDw81whRGV33bREtL9e3IGNpZY0-eBqUI72QVuoB28jDNB2M59YVbfpyl7XAVaVOxiyv54PySWTMcshSAgctKps_jPZKgfPBUs7OvBTOfIdmvSli2sz2C"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
						<div className="absolute bottom-4 right-4">
							<Button variant="secondary" size="sm" className="!bg-white/20 !text-white backdrop-blur-md hover:!bg-white/30">
								<span className="material-symbols-outlined text-[18px]">photo_camera</span>
								{t('users.edit_cover')}
							</Button>
						</div>
					</div>

					<div className="px-6 pb-6 pt-0">
						<div className="-mt-14 flex flex-col items-center justify-between gap-6 md:-mt-16 md:flex-row md:items-end">
							<div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
								<div className="relative">
									<img
										alt={t('users.avatar_alt')}
										className="h-32 w-32 rounded-2xl border-4 border-white object-cover shadow-lg md:h-40 md:w-40 dark:border-slate-900"
										src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsO6x_2KL9oZ6Q-Jc7OnR-W9dP66_aXptP1y_yrVE0SmOqde6bKADz3CUDthFbhKkqNxgu7zDcYwc4TA2xc-OggONRToPrDVBMge_iMxzPcP3Mn7RSecILuu91_jUSyULkC8pdkV1RbbOEcFch9A_pZaL-S9gQkzgN9EOq-SEu7qNBttfFmRP1xT4DrTTjiZILQ9aEfS2w0X2-BkbQlzI67cygjrgBG-AtmPca6eng-j39YyxkjkmTZC5rrE9Bcl5W5vwh-VCltGU"
									/>
									<div className="absolute bottom-2 right-2 rounded-full border-2 border-white bg-primary px-2 py-0.5 text-xs font-bold text-white dark:border-slate-900">
										{user.role}
									</div>
								</div>

								<div className="pb-2">
									<Text variant="h1" weight="bold" className="!text-slate-900 dark:!text-white">
										{user.name}
									</Text>
									<div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 md:justify-start">
										<span>
											<strong className="text-slate-900 dark:text-white">{user.followers}</strong>{' '}
											{t('users.followers')}
										</span>
										<span>
											<strong className="text-slate-900 dark:text-white">{user.following}</strong>{' '}
											{t('users.following')}
										</span>
										<span className="flex items-center gap-1 font-semibold text-amber-500">
											<span className="material-symbols-outlined text-[18px]">stars</span>
											{user.points} {t('users.points')}
										</span>
									</div>
								</div>
							</div>

							<div className="flex gap-2 pb-2">
								<Button size="md" className="!rounded-xl">
									<span className="material-symbols-outlined text-[18px]">add</span>
									{t('users.follow')}
								</Button>
								<Button variant="outline" size="md" className="!rounded-xl !px-4">
									<span className="material-symbols-outlined text-[18px]">mail_outline</span>
								</Button>
								<Button variant="ghost" size="md" className="!rounded-xl !px-4">
									<span className="material-symbols-outlined text-[18px]">more_horiz</span>
								</Button>
							</div>
						</div>
					</div>
				</section>

				<div className="grid gap-6 lg:grid-cols-12">
					<div className="space-y-6 lg:col-span-3">
						<section className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm dark:bg-slate-900">
							<Text variant="h3" weight="bold" className="mb-4 !text-slate-900 dark:!text-white">
								{t('users.about')}
							</Text>
							<Text variant="body2" className="mb-4 leading-relaxed !text-slate-600 dark:!text-slate-400">
								{user.intro}
							</Text>
							<div className="space-y-3">
								<div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
									<span className="material-symbols-outlined text-[20px] text-primary/60">work_outline</span>
									<span>{user.school}</span>
								</div>
								<div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
									<span className="material-symbols-outlined text-[20px] text-primary/60">place</span>
									<span>{user.location}</span>
								</div>
								<div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
									<span className="material-symbols-outlined text-[20px] text-primary/60">link</span>
									<TextLink onClick={() => window.open(`https://${user.website}`, '_blank', 'noopener,noreferrer')}>
										{user.website}
									</TextLink>
								</div>
							</div>

							<div className="mt-6 flex gap-3">
								<Button variant="secondary" className="flex-1 !rounded-lg !px-3 !py-2.5">
									{t('users.edit_profile')}
								</Button>
								<Button variant="ghost" className="!rounded-lg !px-3 !py-2.5">
									<span className="material-symbols-outlined text-[18px]">share</span>
								</Button>
							</div>
						</section>

						<section className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm dark:bg-slate-900">
							<div className="mb-4 flex items-center justify-between gap-3">
								<Text variant="h3" weight="bold" className="!text-slate-900 dark:!text-white">
									{t('users.badges')}
								</Text>
								<TextLink className="text-xs">{t('users.view_all')}</TextLink>
							</div>
							<div className="grid grid-cols-2 gap-3">
								{badges.map((badge) => (
									<div
										key={badge.name}
										title={badge.name}
										className={`aspect-square rounded-xl flex items-center justify-center ${badge.className}`}
									>
										<span className="material-symbols-outlined text-[32px]">{badge.icon}</span>
									</div>
								))}
							</div>
						</section>
					</div>

					<div className="space-y-6 lg:col-span-6">
						<section className="overflow-hidden rounded-2xl border border-primary/5 bg-white shadow-sm dark:bg-slate-900">
							<div className="flex border-b border-slate-100 dark:border-slate-800">
								<button className="flex-1 border-b-2 border-primary py-4 text-sm font-bold text-primary">
									{t('users.tabs.activity')}
								</button>
								<button className="flex-1 py-4 text-sm font-medium text-slate-500 transition-colors hover:text-primary">
									{t('users.tabs.collections')}
								</button>
								<button className="flex-1 py-4 text-sm font-medium text-slate-500 transition-colors hover:text-primary">
									{t('users.tabs.saved_questions')}
								</button>
							</div>

							<div className="p-4">
								<div className="mb-6 rounded-xl border border-primary/5 bg-slate-50 p-4 dark:bg-slate-800/50">
									<div className="flex gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
											<span className="material-symbols-outlined text-[20px]">edit</span>
										</div>
										<button className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-left text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900">
											{t('users.share_prompt')}
										</button>
									</div>
								</div>

								<div className="space-y-6">
									{activities.map((activity) => (
										<article key={`${activity.type}-${activity.title}`} className="space-y-4">
											<div className="flex items-start justify-between gap-3">
												<div className="flex gap-3">
													<div className={`flex h-10 w-10 items-center justify-center rounded-full ${activity.type === 'quiz' ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-600 dark:bg-green-900/30'}`}>
														<span className="material-symbols-outlined text-[20px]">
															{activity.type === 'quiz' ? 'description' : 'question_answer'}
														</span>
													</div>
													<div>
														<Text variant="body2" weight="semibold" className="!text-slate-900 dark:!text-white">
															{activity.title} <span className="text-primary">{activity.subject}</span>
														</Text>
														<Text variant="caption" className="!text-slate-500 dark:!text-slate-400 normal-case tracking-normal">
															{activity.time} • {activity.visibility}
														</Text>
													</div>
												</div>
												<Button variant="ghost" size="sm" className="!h-8 !px-2">
													<span className="material-symbols-outlined text-[18px]">more_horiz</span>
												</Button>
											</div>

											<div className="rounded-xl border border-primary/5 bg-slate-50 p-4 dark:bg-slate-800/50">
												{activity.type === 'quiz' ? (
													<>
														<div className="mb-2 flex items-center justify-between">
															<Text variant="caption" className="!text-slate-500 dark:!text-slate-400">
																{t('users.result')}
															</Text>
															<Text variant="body2" weight="bold" className="!text-green-500">
																{activity.score}
															</Text>
														</div>
														<Text variant="body2" className="!text-slate-600 dark:!text-slate-400">
															{activity.summary}
														</Text>
													</>
												) : (
													<>
														<Text variant="h5" weight="bold" className="mb-2 !text-slate-900 dark:!text-white">
															{activity.question}
														</Text>
														<Text
															variant="body2"
															className="border-l-2 border-primary/20 pl-4 italic !text-slate-600 dark:!text-slate-400"
														>
															{activity.excerpt}
														</Text>
													</>
												)}
											</div>

											<div className="flex items-center gap-6 border-t border-slate-100 pt-2 dark:border-slate-800">
												<button className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-primary">
													<span className="material-symbols-outlined text-[18px]">thumb_up</span>
													{activity.likes}
												</button>
												<button className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-primary">
													<span className="material-symbols-outlined text-[18px]">chat_bubble</span>
													{activity.comments}
												</button>
												<button className="ml-auto flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-primary">
													<span className="material-symbols-outlined text-[18px]">share</span>
												</button>
											</div>
										</article>
									))}
								</div>
							</div>
						</section>
					</div>

					<div className="space-y-6 lg:col-span-3">
						<section className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm dark:bg-slate-900">
							<Text variant="h3" weight="bold" className="mb-4 !text-slate-900 dark:!text-white">
								{t('users.study_stats')}
							</Text>
							<div className="space-y-4">
								<div>
									<div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
										<span>{t('users.xp')}</span>
										<span className="text-primary">{t('users.level', { level: user.level })}</span>
									</div>
									<div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
										<div className="h-full rounded-full bg-primary shadow-[0_0_8px_rgba(72,72,229,0.5)]" style={{ width: `${progress}%` }} />
									</div>
									<div className="mt-1 flex justify-between text-[10px] text-slate-400">
										<span>{user.xpCurrent.toLocaleString()} XP</span>
										<span>{user.xpTarget.toLocaleString()} XP</span>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="rounded-xl border border-blue-100 bg-blue-50 p-3 dark:border-blue-800/30 dark:bg-blue-900/20">
										<Text variant="caption" className="mb-2 block !text-blue-500">{t('users.questions_asked')}</Text>
										<Text variant="h4" weight="bold" className="!text-slate-900 dark:!text-white">
											{user.questionsAsked}
										</Text>
									</div>
									<div className="rounded-xl border border-purple-100 bg-purple-50 p-3 dark:border-purple-800/30 dark:bg-purple-900/20">
										<Text variant="caption" className="mb-2 block !text-purple-500">{t('users.answers_given')}</Text>
										<Text variant="h4" weight="bold" className="!text-slate-900 dark:!text-white">
											{user.answersGiven}
										</Text>
									</div>
								</div>
							</div>
						</section>

						<section className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm dark:bg-slate-900">
							<Text variant="h3" weight="bold" className="mb-4 !text-slate-900 dark:!text-white">
								{t('users.highlights')}
							</Text>
							<div className="flex flex-wrap gap-2">
								{skills.map((skill) => (
									<span key={skill} className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
										{skill}
									</span>
								))}
							</div>
						</section>

						<section className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm dark:bg-slate-900">
							<Text variant="h3" weight="bold" className="mb-4 !text-slate-900 dark:!text-white">
								{t('users.suggested_friends')}
							</Text>
							<div className="space-y-4">
								{suggestions.map((person) => (
									<div key={person.name} className="flex items-center justify-between gap-3">
										<div className="flex items-center gap-3">
											<div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800" />
											<div>
												<Text variant="body2" weight="semibold" className="!text-slate-900 dark:!text-white">
													{person.name}
												</Text>
												<Text variant="caption" className="!text-slate-500 dark:!text-slate-400 normal-case tracking-normal">
													{person.meta}
												</Text>
											</div>
										</div>
										<Button variant="outline" size="sm" className="!h-9 !px-3">
											{t('users.follow')}
										</Button>
									</div>
								))}
							</div>
						</section>

						<section className="rounded-2xl border border-primary/5 bg-white p-6 shadow-sm dark:bg-slate-900">
							<div className="mb-4 flex items-center justify-between gap-3">
								<Text variant="h3" weight="bold" className="!text-slate-900 dark:!text-white">
									{t('users.saved_questions')}
								</Text>
								<TextLink className="text-xs">{t('users.view_all')}</TextLink>
							</div>
							<div className="space-y-4">
								{savedQuestions.map((item) => (
									<div key={item.title} className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
										<Text variant="body2" weight="semibold" className="mb-1 !text-slate-900 dark:!text-white">
											{item.title}
										</Text>
										<Text variant="caption" className="!text-slate-500 dark:!text-slate-400 normal-case tracking-normal">
											{item.subject} • {item.status}
										</Text>
									</div>
								))}
							</div>
						</section>
					</div>
				</div>
			</main>
		</div>
	);
};