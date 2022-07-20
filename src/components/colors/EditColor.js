import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectColorById,
  editColor,
} from "../../features/filters/filtersSlice";
import InputForm from "../todos/header/InputForm";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const EditColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const id = parseInt(param.id);
  const color = useSelector((state) => selectColorById(state, id));

  const [text, setText] = useState(color.name);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSave = () => {
    dispatch(editColor({ id, text }));
    navigate("/colors");
  };

  return (
    <>
      <InputForm
        placeholder="Enter new color name..."
        label="Edit color"
        value={text}
        onChange={handleChange}
        autoFocus={true}
      />

      <Stack spacing={2} direction="row" m={5} sx={{ float: "right" }}>
        <Button variant="contained" onClick={() => navigate("/colors")}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Stack>
    </>
  );
};

export default EditColor;
