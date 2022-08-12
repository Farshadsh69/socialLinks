// import useStyles from "./formStyles";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { linksType } from "../../redux/slices/link-slice";
import SocialIcon from "./SocialIcon";
//...............................................styles

const InputBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  borderRadius: 16,
  marginBottom: 20,
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
//..................type
interface socialDataType {
  social: {
    label: string;
  };
}
//.............................................
function Form(props: {
  setOpen: any;
  setConfirmation: any;
  setOpenAlert: any;
  mode: any;
}) {
  const { setOpen, setConfirmation, setOpenAlert, mode } = props;
  const [socialData, setSocialData] = useState<socialDataType>([]);
  //...................................................api
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
  //..................................................form

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
    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }
    postData("http://localhost:3002/links", data);
    setOpen(false);
    reset();
    setOpenAlert(true);
    setConfirmation(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  //...........................................func handel
  const handelCancel = () => {
    setOpen(false);
    reset();
  };
  return (
    <form {...methods} onSubmit={handleSubmit(onSubmit)}>
      <InputBox sx={{ bgcolor: "background.light" }}>
        <Typography color="primary" sx={{ marginBottom: 2 }}>
          افزودن مسیر ارتباطی ؟
        </Typography>
        <InputStyle>
          <Stack width="32%" direction="column" sx={{}}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={socialData}
              color="secondary"
              sx={{
                "& .MuiAutocomplete-popupIndicatorOpen	": {
                  color: "primary",
                },
                "& .MuiAutocomplete-popupIndicator	": {
                  color: "primary",
                },
                "& .muirtl-rvtl6r-MuiInputBase-root-MuiOutlinedInput-root": {
                  color: "primary",
                },
              }}
              renderInput={(params) => (
                <TextField
                  sx={{
                    "& .muirtl-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        color: "#ffffff",
                      },
                    "& .muirtl-oks55i-MuiFormLabel-root-MuiInputLabel-root": {
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
              autoComplete="off"
              error={errors.link ? true : false}
              color="secondary"
              label="لینک"
              dir="ltr"
              sx={{
                width: "100%",
                "& .muirtl-io8c6t-MuiInputBase-root-MuiOutlinedInput-root": {
                  color: "#ffffff",
                },
                "& .muirtl-1v0t1ns-MuiFormLabel-root-MuiInputLabel-root": {
                  color: "#72808b",
                },
              }}
              {...register("link", {
                required: true,
                pattern: {
                  value:
                    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                  message: "محتویات این فیلد باید از جنس آدرس اینترنتی باشد.",
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
            onClick={handelCancel}
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
            ثبت مسیر ارتباطی
          </Button>
        </BtnInput>
      </InputBox>
    </form>
  );
}
export default Form;
