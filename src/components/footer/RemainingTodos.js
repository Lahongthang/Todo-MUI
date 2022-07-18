import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const RemainingTodos = ({count}) => {
  const suffix = count < 2 ? "" : "s";
  return (
    <Box>
      <Typography variant="subtitle2" component="p">
        Remaining todos
      </Typography>
      <Typography variant="subtitle1" component="p">
        {count} item{suffix} left
      </Typography>
    </Box>
  );
};

export default RemainingTodos;
