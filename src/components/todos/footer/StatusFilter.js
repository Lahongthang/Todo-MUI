import { StatusFilters } from "../../../features/filters/filtersSlice";

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const StatusFilter = ({ value: statusFilter, onChange }) => {
  const handleChange = (e) => {
    const newStatus = e.target.value;
    onChange(newStatus);
  };

  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key];
    return (
      <ToggleButton
        key={key}
        size="small"
        value={value}
        sx={{ border: "none" }}
      >
        {key}
      </ToggleButton>
    );
  });

  return (
    <Box>
      <Typography variant="subtitle2" component="p">
        Filter by Status
      </Typography>
      <ToggleButtonGroup
        orientation="vertical"
        value={statusFilter}
        exclusive
        onChange={handleChange}
      >
        {renderedFilters}
      </ToggleButtonGroup>
    </Box>
  );
};

export default StatusFilter;
