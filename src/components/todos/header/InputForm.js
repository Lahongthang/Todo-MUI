import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const InputForm = ({
  placeholder,
  label,
  value,
  onChange,
  onKeyDown,
  autoFocus,
}) => {
  return (
    <Box marginBottom={3}>
      <TextField
        variant="filled"
        placeholder={placeholder}
        fullWidth
        color="info"
        label={label}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoComplete="off"
        autoFocus={autoFocus}
      />
    </Box>
  );
};

export default InputForm;
