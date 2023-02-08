import React, { MouseEvent, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import freiburgLogo from "../assets/icons/freiburg-logo/freiburg-logo-dark.svg";
import { LogoutRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { stringToColor } from "../utils/StringToColor";
import { reset, userLogOut } from "../redux/slices/AuthUserSlice";
import { FileAPISlice } from "../redux/slices/documents/ApplicationFileAPISlice";
import { ApplicationAPISlice } from "../redux/slices/applications/ApplicationAPISlice";
import { GetMeAPISlice } from "../redux/slices/user/GetUserAPISlice";
import { ApplicantAPISlice } from "../redux/slices/applicants/ApplicantsAPISlice";
import { SignIn } from "../pages/signin/SignIn";
import { Footer } from "./footer/footer";

/**
 * @param {boolean} showAccountMenu - Option to display toolbar account menu
 * @param {boolean} showConsoleLink - Option to display management console link
 * @param {boolean} protectedArea - State if prop children are in a protected area
 * @param {React.ReactNode | React.ReactNode[]} children - react component children to nest in page
 */
export interface PageScaffoldProps {
  showAccountMenu: boolean;
  showConsoleLink: boolean;
  protectedArea: boolean;
  children: React.ReactNode | React.ReactNode[];
}

//helper component to wrap page components with a standardised page layout with navigation toolbar and account menu
export const PageScaffold = (props: PageScaffoldProps) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { loading, userInfo, error } = useSelector(
    (state: any) => state.authUser
  );

  //menu drop down handler
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  //menu close handler
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //method to sign out user
  const signOutUser = () => {
    dispatch(userLogOut());
    dispatch(reset());
    handleCloseUserMenu();
    dispatch(ApplicationAPISlice.util.resetApiState());
    dispatch(GetMeAPISlice.util.resetApiState());
    dispatch(ApplicantAPISlice.util.resetApiState());
    dispatch(FileAPISlice.util.resetApiState());
    navigate("/");
  };

  //helper function to style and set Avatar User Initials
  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  //TODO: revisit auth implementation approach
  return (
    <>
      {!userInfo.token && props.protectedArea ? (
        <>
          <SignIn />
        </>
      ) : (
        <>
          <AppBar
            elevation={0}
            sx={{
              height: "53px",
              background: "#ffffff",
              justifyItems: "center",
            }}
            position="sticky"
            component="nav"
          >
            <Toolbar variant="dense">
              <Box
                display="flex"
                component="img"
                sx={{
                  height: "80%",
                  width: "auto",
                }}
                alt="Freiburg logo"
                src={freiburgLogo}
              />
              <Box
                sx={{
                  marginLeft: "20px",
                  marginRight: "20px",
                  justifyItems: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontSize: 12, fontWeight: 600, color: "red" }}
                >
                  Prototyp
                </Typography>
              </Box>

              <Box
                display="flex"
                flexGrow={1}
                sx={{
                  height: "100%",
                  width: "auto",
                }}
              />
              {props.showConsoleLink && (
                <Box
                  sx={{
                    justifyItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    size="medium"
                    color={"secondary"}
                    sx={{
                      textAlign: "center",
                      boxShadow: 0,
                      borderRadius: 1,
                      textTransform: "none",
                      marginTop: "2.5px",
                    }}
                    onClick={() => {
                      navigate("/managementconsole", { replace: true });
                    }}
                  >
                    Anmeldeportal
                  </Button>
                </Box>
              )}
              {props.showAccountMenu && (
                <Box sx={{ flexGrow: 0, margin: "16px" }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar {...stringAvatar(userInfo.name ?? "")} />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{
                      width: 400,
                      maxWidth: "100%",
                      mt: "30px",
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "hidden",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuList>
                      <MenuItem onClick={signOutUser}>
                        <ListItemIcon>
                          <LogoutRounded />
                        </ListItemIcon>
                        <ListItemText>Sign Out</ListItemText>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              )}
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              marginLeft: 12,
              marginRight: 12,
              marginBottom: 24,
              flex: 1,
              flexGrow: 1,
              flexDirection: "column",
              height: "80vh",
            }}
          >
            {props.children || null}
            {!props.protectedArea && <Footer />}
          </Box>
        </>
      )}
    </>
  );
};
