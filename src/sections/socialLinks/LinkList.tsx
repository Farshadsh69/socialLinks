// import useStyles from "./formStyles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Autocomplete,
  Box,
  Button,
  Collapse,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { linksType } from "../../redux/slices/link-slice";
import DeleteLinkDialog from "./DeleteLinkDialog";
import SocialIcon from "./SocialIcon";

//...............................................styles
const RootList = styled(Stack)(() => ({
  width: "99%",
  borderRadius: 16,
  padding: "5px 10px",
}));
const AddList = styled(Stack)(() => ({
  justifyContent: "space-between",
  flexDirection: "row",
  width: "100%",
  borderRadius: 16,
  marginBottom: 5,
  marginTop: 5,
}));
const InputBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  borderRadius: 16,
  marginBottom: 30,
  padding: 15,
}));
const InputStyle = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 45,
  "& .muirtl-1d3z3hw-MuiOutlinedInput-notchedOutline": {
    borderColor: "#686f77",
  },
}));

const BtnInput = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "right",
  marginBottom: 10,
}));

//.............................................

//..............................
interface listDataType {
  map(arg0: (item: any) => void): import("react").ReactNode;
  length: number;
  links: {
    id: string;
    link: string;
    type: string;
  };
}
interface socialDataType {
  social: {
    label: string;
  };
}

function LinkList(props: {
  setOpenAlert: any;
  setOpenAlertEdit: any;
  mode: any;
}) {
  const { setOpenAlert, setOpenAlertEdit, mode } = props;
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [idLink, setIdLink] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [listData, setListData] = useState<listDataType>([]);
  const [socialData, setSocialData] = useState<socialDataType>([]);

  //...........Api

  const fetchData = () => {
    fetch("http://localhost:3002/links")
      .then((res) => res.json())
      .then((result) => {
        return setListData(result);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  //.....
  const fetchSocialData = () => {
    fetch("http://localhost:3002/socialLinks")
      .then((res) => res.json())
      .then((result) => {
        return setSocialData(result);
      });
  };
  useEffect(() => {
    fetchSocialData();
  }, []);
  //.....................form
  const defaultValues = {};
  const methods = useForm<linksType>({
    defaultValues,
    mode: "onChange",
  });
  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = methods;
  const onSubmit: SubmitHandler<linksType> = (data) => {
    async function updateData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }
    updateData(`http://localhost:3002/links/${idLink}`, data);
    reset();
    setOpen({ ...open, idLink: false });
    setOpenAlertEdit(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  //.....................function handel
  const handelCancel = (key: string) => {
    setOpen({ ...open, [key]: false });
    reset();
  };
  const handelEdit = (key: string) => {
    setOpen({ ...open, [key]: true });
  };

  return (
    <>
      {listData.map((item) => (
        <RootList
          key={item.id}
          sx={{ bgcolor: mode === "light" ? "" : "#343d48" }}
        >
          <form {...methods} onSubmit={handleSubmit(onSubmit)}>
            <AddList
              sx={{ bgcolor: mode === "light" ? "background.light" : "" }}
            >
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Stack flexDirection="row" alignItems="center">
                  <SocialIcon socialName={item.type as string} />
                  <Typography variant="body1" color="primary">
                    {item.type}
                  </Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" m={2}>
                  <Typography variant="subtitle2" color="primary">
                    لینک :
                  </Typography>
                  <Typography
                    variant="body1"
                    color="secondary"
                    sx={{ marginLeft: 1 }}
                  >
                    {item.link}
                  </Typography>
                </Stack>
              </Stack>
              <Stack flexDirection="row">
                <Button
                  color={open[item.id] ? "warning" : "secondary"}
                  onClick={() => {
                    handelEdit(item.id);
                    setIdLink(item.id);
                  }}
                >
                  <EditIcon sx={{ fontSize: 14, margin: "0px 5px 0px 5px " }} />
                  ویرایش
                </Button>
                <Button
                  color="error"
                  onClick={() => {
                    setOpenDialog(true);
                    setIdLink(item.id);
                  }}
                >
                  <DeleteForeverIcon
                    color="error"
                    sx={{ fontSize: 14, margin: "0px 5px 0px 5px " }}
                  />
                  حذف
                </Button>
              </Stack>
            </AddList>
            <Collapse in={open[item.id]}>
              <InputBox sx={{ bgcolor: "background.light" }}>
                <Typography color="primary" sx={{ marginBottom: 2 }}>
                  ویرایش مسیر ارتباطی {item.type}
                </Typography>
                <InputStyle>
                  <Stack width="32%" direction="column">
                    <Autocomplete
                      defaultValue={item.type}
                      disablePortal
                      id="combo-box-demo"
                      options={socialData}
                      color="secondary"
                      sx={{
                        "& .MuiAutocomplete-popupIndicatorOpen	": {
                          color: "#ffffff",
                        },
                        "& .MuiAutocomplete-popupIndicator	": {
                          color: "#ffffff",
                        },
                        "& .muirtl-rvtl6r-MuiInputBase-root-MuiOutlinedInput-root":
                          {
                            color: "#fff",
                          },
                      }}
                      renderInput={(params) => (
                        <TextField
                          defaultValue={item.type}
                          sx={{
                            "& .muirtl-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                color: "#ffffff",
                              },
                            "& .muirtl-oks55i-MuiFormLabel-root-MuiInputLabel-root":
                              {
                                color: "#72808b",
                              },
                          }}
                          error={errors.type ? true : false}
                          {...params}
                          label="نوع"
                          {...register("type", { required: true })}
                        />
                      )}
                    />

                    <Typography color="error" fontSize={13} mr={2} ml={2}>
                      {errors.type && "وارد کردن این فیلد اجباری است."}
                    </Typography>
                  </Stack>
                  <Stack sx={{ width: "66%" }} direction="column">
                    <TextField
                      defaultValue={item.link}
                      autoComplete="off"
                      error={errors.link ? true : false}
                      color="secondary"
                      label="لینک"
                      dir="ltr"
                      sx={{
                        width: "100%",
                        "& .muirtl-io8c6t-MuiInputBase-root-MuiOutlinedInput-root":
                          {
                            color: "#ffffff",
                          },
                        "& .muirtl-1v0t1ns-MuiFormLabel-root-MuiInputLabel-root":
                          {
                            color: "#72808b",
                          },
                      }}
                      {...register("link", {
                        required: true,
                        pattern: {
                          value:
                            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                          message:
                            "محتویات این فیلد باید از جنس آدرس اینترنتی باشد.",
                        },
                      })}
                    />

                    {errors.link?.message ? (
                      <Typography color="error" fontSize={13} mr={2} ml={2}>
                        {errors.link?.message && errors.link?.message}
                      </Typography>
                    ) : (
                      <Typography color="error" fontSize={13} mr={2} ml={2}>
                        {errors.link && "وارد کردن این فیلد اجباری است."}
                      </Typography>
                    )}
                  </Stack>
                </InputStyle>
                <BtnInput>
                  <Button
                    onClick={() => handelCancel(item.id)}
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
                  <Button
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
                    ویرایش مسیر ارتباطی {item.type}
                  </Button>
                </BtnInput>
              </InputBox>
            </Collapse>
          </form>
        </RootList>
      ))}
      <DeleteLinkDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        idLink={idLink}
        setOpenAlert={setOpenAlert}
        mode={mode}
      />
    </>
  );
}
export default LinkList;
