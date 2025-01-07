import { Select, MenuItem, FormControl } from '@mui/material';

interface PeriodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <FormControl size="small" className="min-w-[120px]">
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
      >
        <MenuItem value="7">過去7日間</MenuItem>
        <MenuItem value="30">過去30日間</MenuItem>
        <MenuItem value="90">過去90日間</MenuItem>
      </Select>
    </FormControl>
  );
}
