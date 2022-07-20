import { useSelector } from "react-redux";
import { selectAllColors } from "../../../features/filters/filtersSlice";

import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ColorFilter = ({ value: colorsFilter, onChange }) => {
  const apiColors = useSelector(selectAllColors);
  const renderedFilters = apiColors.map((color) => {
    const checked = colorsFilter.includes(color.name);
    const handleChange = () => {
      const changeType = checked ? "removed" : "added";
      onChange(color.name, changeType);
    };
    return (
      <Grid item key={color.id} xs={3} md={6}>
        <FormGroup>
          <FormControlLabel
            control={
              <>
                <Checkbox checked={checked} onChange={handleChange} />
                <span
                  style={{
                    width: 28,
                    height: 14,
                    background: color.name,
                    marginRight: 5,
                  }}
                />
              </>
            }
            label={color.name}
          />
        </FormGroup>
      </Grid>
    );
  });

  return (
    <Box>
      <Typography variant="subtitle2" component="p">
        Filter by Colors
      </Typography>
      <Grid container textAlign="left">
        {renderedFilters}
      </Grid>
    </Box>
  );
};

export default ColorFilter;
