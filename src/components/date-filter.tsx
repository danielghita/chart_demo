import { useCallback } from 'react';

interface FilterProps {
	min: string;
	max: string;
	start: string;
	end: string;
	onChange?: (time: { start: string, end: string }) => void;
}

export default function DateFilter({ min, max, start, end, onChange }: FilterProps) {
	const update = useCallback((a: any) => {
		console.log(a);
		const o = { start, end }
		o[a.target.name as 'start' | 'end'] = a.target.value;
		onChange?.(o);
	}, [start, end, onChange]);
	return (
		<div className="filters">
			Start: <input name="start" type="date" value={ start } min={ min } max={ max } onChange={ update } />
			End: <input name="end" type="date" value={ end } min={ min } max={ max } onChange={ update } />
		</div>
	);
}
