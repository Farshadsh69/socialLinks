import AddIcon from "@mui/icons-material/Add";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Form from "./Form";
import LinkList from "./LinkList";
//...............................................styles

const FormRootStyle = styled(Stack)(() => ({
  flexDirection: "column",
  justifyContent: "center",
  padding: "2% 0px 75px 150px",
}));
const THomeStyle = styled(Typography)(() => ({
  padding: "0px 20px 0px 0px ",
  position: "relative",
  "&::after": {
    content: "''",
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 16,
    backgroundColor: "#d0d0d0de",
    top: 11,
    right: 5,
  },
}));
const TUser = styled(Typography)(() => ({
  padding: "0px 30px 0px 10px",
  position: "relative",
  "&::after": {
    content: "''",
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 16,
    backgroundColor: "#d0d0d0de",
    top: 11,
    right: 15,
  },
}));
const BoxSetting = styled(Box)(() => ({
  width: 852,
  borderRadius: 16,
  boxShadow: "0px 10px 10px 10px #060d1573",
  display: "flex",
  flexDirection: "column",
  padding: 20,
}));
const EditBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 20,
}));

const ListStyle = styled(Stack)((theme) => ({
  gap: 8,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "0.2em",
  },
  "&::-webkit-scrollbar-track": {
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(52,61,72.0.7)",
    outline: "1px solid rgb(33 150 243 / 25%)",
    borderRadius: 16,
  },
}));
//.............................................
function Main(props: { setMode: any; mode: any }) {
  const { setMode, mode } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openAlertEdit, setOpenAlertEdit] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);

  //.....................

  return (
    <FormRootStyle>
      <Stack width="30%">
        {confirmation ? (
          <Collapse in={openAlert}>
            <Alert variant="outlined" severity="success">
              <Typography color="secondary">با موفقیت ثبت شد</Typography>
            </Alert>
          </Collapse>
        ) : (
          <Collapse in={openAlert}>
            <Alert variant="outlined" severity="error">
              <Typography color="error">با موفقیت حذف شد</Typography>
            </Alert>
          </Collapse>
        )}
      </Stack>
      <Stack width="30%">
        {openAlertEdit ? (
          <Alert variant="outlined" severity="info">
            <Typography color="secondary">با موفقیت ویرایش شد</Typography>
          </Alert>
        ) : (
          ""
        )}
      </Stack>
      <Stack spacing={60} direction="row" sx={{ paddingBottom: 2 }}>
        <Stack>
          <Typography color="primary" sx={{ fontSize: "20px !important" }}>
            تنضیمات کاربری
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button>ENGLISH</Button>
          <Button>فارسی</Button>
          {mode === "light" ? (
            <LightModeIcon onClick={() => setMode("dark")} color="secondary" />
          ) : (
            <Brightness3Icon onClick={() => setMode("light")} color="primary" />
          )}
        </Stack>
      </Stack>
      <Stack flexDirection="row" alignItems="center" sx={{ paddingBottom: 5 }}>
        <THomeStyle color="primary.dark" variant="subtitle1">
          خانه
        </THomeStyle>
        <TUser color="primary.dark" variant="subtitle1">
          کاربر
        </TUser>
        <Typography color="primary.dark" variant="subtitle1">
          تنضیمات کاربری
        </Typography>
      </Stack>
      <BoxSetting sx={{ bgcolor: "background.dark" }}>
        <Typography color="secondary.light" variant="subtitle2" mb={2}>
          مسیرهای ارتباطی
        </Typography>
        <EditBox>
          <Button
            size="small"
            color={open ? "warning" : "secondary"}
            onClick={() => setOpen(true)}
          >
            <AddIcon
              fontSize="small"
              sx={{
                margin: "0px 5px 0px 5px ",
              }}
            />
            افزودن مسیر ارتباطی
          </Button>
        </EditBox>
        {/* >>>>>>>>>>>>>>>>>>>>>>...Form...<<<<<<<<<<<<<<<<<<<<<< */}
        <Collapse in={open}>
          <Form
            setOpen={setOpen}
            setConfirmation={setConfirmation}
            setOpenAlert={setOpenAlert}
            mode={mode}
          />
        </Collapse>
        {/* >>>>>>>>>>>>>>>>>>>>>>...AddList...<<<<<<<<<<<<<<<<<<< */}
        <ListStyle>
          <LinkList
            setOpenAlert={setOpenAlert}
            setOpenAlertEdit={setOpenAlertEdit}
            mode={mode}
          />
        </ListStyle>
      </BoxSetting>
    </FormRootStyle>
  );
}
export default Main;
