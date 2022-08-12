import styled from "@emotion/styled";
import { Button, Dialog, Stack, Typography } from "@mui/material";
//...................................................style
const RootStyle = styled(Stack)(() => ({
  width: 410,
  height: 218,
  flexDirection: "column",
  padding: 40,
  borderRadius: 12,
}));
//.............................................................
function DeleteLinkDialog(props: {
  openDialog: any;
  setOpenDialog: any;
  idLink: any;
  setOpenAlert: any;
  mode: any;
}) {
  const { openDialog, setOpenDialog, idLink, setOpenAlert, mode } = props;
  //...........Api
  const handelDelete = () => {
    fetch(`http://localhost:3002/links/${idLink}`, {
      method: "DELETE",
    }).then((response) => {
      return response.json();
    });

    setOpenDialog(false);
    setOpenAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Dialog
      open={openDialog}
      onClick={() => setOpenDialog(!openDialog)}
      sx={{
        "& .muirtl-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          bgcolor: "background.dark",
        },
      }}
    >
      <RootStyle spacing={10} sx={{ backgroundColor: "background.main" }}>
        <Typography variant="h6" color="primary" sx={{ textAlign: "left" }}>
          آیا از تصمیم خود مطمئن هستید؟
        </Typography>
        <Stack direction="row">
          <Button
            onClick={handelDelete}
            color="secondary"
            variant="contained"
            type="submit"
            sx={{
              color: "#332616",
              height: 30,
              margin: "0px 5px",
              boxShadow: "0px 10px 5px 0px #c0c24138",
            }}
          >
            حذف
          </Button>
          <Button
            onClick={() => setOpenDialog(false)}
            color="secondary"
            variant="outlined"
            sx={{
              height: 30,
              margin: "0px 5px",
              boxShadow: "0px 10px 5px 0px #a2aeba38",
            }}
          >
            انصراف
          </Button>
        </Stack>
      </RootStyle>
    </Dialog>
  );
}
export default DeleteLinkDialog;
