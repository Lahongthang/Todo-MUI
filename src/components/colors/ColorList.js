import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAllColors,
  addColor,
  deleteColor,
} from "../../features/filters/filtersSlice";
import InputForm from "../todos/header/InputForm";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import RectangleIcon from "@mui/icons-material/Rectangle";
import Stack from "@mui/material/Stack";

import { createTheme, ThemeProvider } from "@mui/material";

const tableTheme = createTheme({
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          ":hover": {
            backgroundColor: "#e0e0e0",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: "center",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: "bold",
        },
        h4: {
          fontWeight: 'normal'
        }
      },
    },
  },
});

const Colors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colors = useSelector(selectAllColors);

  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.which === 13 && text) {
      setText("");
      dispatch(addColor(e.target.value));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteColor(id));
  };

  return (
    <ThemeProvider theme={tableTheme}>
      <InputForm
        placeholder="Enter color name..."
        label="Add color here"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus={false}
      />

      <Typography
        variant="h4"
        component="p"
        marginY={5}
        sx={{ textAlign: "center" }}
      >
        Available Colors
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "20%" }}>
              <Typography variant="h6" component="p">
                ID
              </Typography>
            </TableCell>
            <TableCell sx={{ width: "40%" }}>
              <Typography variant="h6" component="p">
                Name
              </Typography>
            </TableCell>
            <TableCell sx={{ width: "20%" }}>
              <Typography variant="h6" component="p">
                Edit
              </Typography>
            </TableCell>
            <TableCell sx={{ width: "20%" }}>
              <Typography variant="h6" component="p">
                Delete
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {colors.map((color) => (
            <TableRow key={color.id}>
              <TableCell>
                <Typography variant="subtitle2" component="p">
                  {color.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Stack direction="row">
                  <RectangleIcon sx={{ color: color.name, mx: 3 }} />
                  <Typography variant="body1" component="p">
                    {color.name}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => navigate(`/colors/${color.id}`)}>
                  <EditIcon color="primary" />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(color.id)}>
                  <DeleteIcon sx={{ color: "#111" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
};

export default Colors;
