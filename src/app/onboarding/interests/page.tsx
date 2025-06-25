'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

const CATEGORIES = [
	{ id: 'explore', label: 'Erkunden & Shoppen', icon: 'sexshop', active: true },
	{ id: 'nightlife', label: 'Nightlife & Events', icon: 'mask', active: false },
	{ id: 'private', label: 'Private Experiences', icon: 'haus', active: false },
	{ id: 'community', label: 'Community Spaces', icon: 'community', active: false },
];

export default function OnboardingInterests() {
	const [selectedCategories, setSelectedCategories] = useState(
		CATEGORIES.filter(cat => cat.active).map(cat => cat.id)
	);

	const toggleCategory = (categoryId: string) => {
		setSelectedCategories(prev =>
			prev.includes(categoryId)
				? prev.filter(id => id !== categoryId)
				: [...prev, categoryId]
		);
	};

	return (
		<div className="min-h-screen bg-background-primary flex flex-col">
			{/* Status Bar */}
			<div className="flex justify-between items-center p-4 text-sm text-text-secondary">
				<span>9:41</span>
				<div className="flex gap-1">
					<div className="w-1 h-1 bg-text-secondary rounded-full"></div>
					<div className="w-1 h-1 bg-text-secondary rounded-full"></div>
					<div className="w-1 h-1 bg-text-secondary rounded-full"></div>
					<div className="w-1 h-1 bg-text-secondary rounded-full"></div>
					<div className="w-1 h-1 bg-text-secondary rounded-full"></div>
				</div>
				<span>100%</span>
			</div>

			{/* Content */}
			<div className="flex-1 px-6 py-8">
				<div className="max-w-sm mx-auto">
					<h1 className="text-2xl font-bold text-text-primary mb-8 text-center">
						Was suchst du?
					</h1>

					{/* Category Grid */}
					<div className="grid grid-cols-2 gap-4 mb-8">
						{CATEGORIES.map(category => (
							<div
								key={category.id}
								onClick={() => toggleCategory(category.id)}
								className={`
                  p-6 rounded-xl text-center cursor-pointer transition-all border-2
                  ${selectedCategories.includes(category.id)
									? 'border-primary bg-primary/10 text-text-primary'
									: 'border-border bg-background-tertiary text-text-secondary hover:border-border-light'
								}
                `}
							>
								<div className="mb-2 flex justify-center">
									<Icon
										name={category.icon}
										size={40}
										color="#888888"
										containerColor="#d32f2f"
										showContainer={true}
									/>
								</div>
								<div className="font-medium text-sm">
									{category.label}
								</div>
							</div>
						))}
					</div>

					<Button
						className="w-full h-12 text-lg font-semibold"
						variant="primary"
						onClick={() => (window.location.href = '/app-main')}
					>
						Los geht&apos;s
					</Button>
				</div>
			</div>
		</div>
	);
}