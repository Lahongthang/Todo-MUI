import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const MarkAndClear = ({ onMarkAllCompleted, onClearAllCompleted }) => {
  return (
    <Stack spacing={2}>
      <Button variant="contained" size="small" onClick={onMarkAllCompleted}>
        Mark All Completed
      </Button>
      <Button variant="contained" size="small" onClick={onClearAllCompleted}>
        Delete All Completed
      </Button>
    </Stack>
  );
};

export default MarkAndClear;
