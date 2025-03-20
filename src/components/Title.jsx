import { Box, Typography, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";

import ModalDialog from "./ModalDialog";
function Title({ entity, buttonLabel, open, onOpenModal, onCloseModal }) {
  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: "25px" }}>
        <Grid size={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
          >
            {/* Left Side - Page Title */}
            <Typography variant="h5" fontWeight="bold">
              {entity}
            </Typography>

            {/* Right Side - Add New Product Button */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={onOpenModal}
            >
              {buttonLabel}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ModalDialog open={open} onCloseModal={onCloseModal} entity={entity} />
    </>
  );
}

export default Title;
