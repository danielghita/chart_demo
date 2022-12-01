import { ChangeEvent, useCallback } from 'react';

interface FilterProps {
	min: string;
	max: string;
	start: string;
	end: string;
	onChange?: (time: { start: string, end: string }) => void;
}

export default function DateFilter({ min, max, start, end, onChange }: FilterProps) {
	const update = useCallback((event: ChangeEvent) => {
		const values = { start, end }
		const target = event.target as HTMLInputElement;
		values[target.name as 'start' | 'end'] = target.value;
		onChange?.(values);
	}, [start, end, onChange]);
	return (
		<div className="filters">
			<label>
				Start:
				<input name="start" type="date" value={ start } min={ min } max={ max } onChange={ update } />
			</label>
			<label>
				End:
				<input name="end" type="date" value={ end } min={ min } max={ max } onChange={ update } />
			</label>
		</div>
	);
}
