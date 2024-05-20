// rafce
import React from 'react'
// import { Typography } from '@mui/material/styles/createTypography';

import {useState} from "react"
import {Container,Paper,Typography,Stack,Avatar,IconButton} from "@mui/material"
// contaier provide layout container, 
// and paper creates a paper like surface with elevation(0-24) and shadows
// typography===display text with predefined styles,ensure consistent typography across app
// stack se component ke upar component rkhte

// import * krke sb nhi aate as MUI LIKH lo
import * as MUI from "@mui/material"

// import {CameraAlt as CameraAltIcon } from "@mui/icons-material"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import { VisuallyHiddenInput } from '../components/styles/StyledComponents'

import {useInputValidation,useStrongPassword,useFileHandler} from "6pp";
// useInputValidation=
//      dont allow special char in input
// useStrongPassword=
//      8digit long,uppercase,lowercase,digit,etc
// userFileHandler=
//      visuallyhiddencomponent ke liye


import { usernameValidator } from '../utils/validators'



const Login = () => {
  const [isLogin, setIsLogin] =useState(true);

  // const toggleLogin=()=>setIsLogin(false);

  const toggleLogin=()=>{
    setIsLogin((prev)=>!prev)
  };

  
  const name=useInputValidation("");
  // 6pp(npm package) ke andar isse input me special char nhi aate
  const bio=useInputValidation("");
  const username=useInputValidation("",usernameValidator);//user-defined middleware
  // const password=useStrongPassword();
  const password=useInputValidation("");

  // usefilehandler 6pp package me defined,isse single/multiple image with restricted size upload
  const avatar=useFileHandler("single");

  const handleLogin=(event)=>{
    event.preventDefault();
  }
  const handleSignUp=(event)=>{
    event.preventDefault();
  }

  return (
    <div 
    style={{
    backgroundImage:
    "linear-gradient(red,blue)"
    // "linear-gradient(rgba(255,225,209,1),rgba(249,159,159,1))"
    }}
    >

    
    {/* // react component ko style style tag se, vahi  */}
    {/* // material ui ke components ki style sx se */}
    <Container component={"main"} maxWidth="xs"
    // component main provide sementic meaning
    // it indicate that <container> component should render as <main> element in html
    sx={{
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      // width:"50%"
      // backgroundColor:"red",
    }}>
      <Paper elevation={3} sx={{padding:4,display:"flex",flexDirection:"column",alignItems:"center"}}>
      {/* elevation={3} sets elevation level of paper, giving a shadow effect ,3 represent elevation level */}
          {
            // isLogin?<span>Login</span>:<span>Register</span>
            isLogin?(

              // <></> shorthand for react fragment,
              // fragment is a way to group multiple child elem without adding extra DOM element 
              <>

                {/* typography in material ui used to display text with predefined styles,ensure consistent typography across app */}
                <Typography variant="h5" >Login</Typography>
                <form
                  style={{
                    padding:4,
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    // backgroundColor:"blue",
                  }}
                  onSubmit={handleLogin}
                  >


                  <MUI.TextField  
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  // variant="filled"

                  // const username=useInputValidation("")
                  value={username.value}
                  onChange={username.changeHandler}
                  />

                  {
                    username.error&&(
                      <Typography color="error" variant="caption">
                        {username.error}
                      </Typography>
                    )
                  }

                  <MUI.TextField  
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  value={password.value}
                  onChange={password.changeHandler}
                  />


                  <MUI.Button
                    sx={{marginTop:"0rem"}}
                    variant="contained"//contained se blue color ki button
                    color="primary"
                    type="submit"
                    fullWidth

                  >Login</MUI.Button>

                  <Typography textAlign={"center"} margin={"1rem"}>OR</Typography>
                  
                  <MUI.Button
                    // sx={{marginTop:"1rem"}}
                    variant="text"//contained se blue color ki button
                    color="primary"
                    type="submit"
                    fullWidth
                    onClick={toggleLogin}

                  >Sign Up Instead</MUI.Button>
                </form>
              </>
            )
            :
            (
              <>

              {/* typography used to display text with predefined styles,ensure consistent typography across app */}
              <Typography variant="h5" >Sign Up</Typography>
              <form
                style={{
                  padding:4,
                  display:"flex",
                  flexDirection:"column",
                  alignItems:"center",
                }}

                // abhi handleSignUp event.preventDefault kr rha
                onSubmit={handleSignUp}
                >


                {/*stack component of material ui used to stack child component vertically by defalt  */}
                <Stack position={"relative"} width={"10rem"} margin={"auto"} >
                  <Avatar
                  sx={{
                    width:"10rem",
                    height:"10rem",
                    objectFit:"contain",
                  }}
                  
                  // const avatar=useFileHandler("single");//defined in 6pp package
                  src={avatar.preview}

                  >
                    
                  </Avatar>

                  
                  <IconButton
                    sx={{
                      position:"absolute",
                      bottom:"0",
                      right:"0",
                      color:"white",
                      bgcolor:"rgba(0,0,0,0.5)",
                      ":hover":{
                        bgcolor:"rgba(0,0,0,0.7)",
                      }
                    }}
                    // sementic meaning provide krta component
                    component="label"
                  >
                        
                      <>
                        <CameraAltIcon/>
                        <VisuallyHiddenInput type="file" onChange={avatar.changeHandler}/>
                      </>
                    

                  </IconButton>
                </Stack>

                { 
                  avatar.error&&(
                    <Typography 
                    margin={"1rem"} 
                    color="error" 
                    variant="caption"
                    display={"block"}
                    width={"fit-content"}
                    >
                      {avatar.error}
                    </Typography>
                  )
                }


                  
                <MUI.TextField  
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
                // variant="filled"
                value={name.value}
                onChange={name.changeHandler}
                />

                <MUI.TextField  
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
                // variant="filled"
                value={bio.value}
                onChange={bio.changeHandler}
                />

                <MUI.TextField  
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  // variant="filled"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                  
                  {
                    username.error&&(
                      <Typography color="error" variant="caption">
                        {username.error}
                      </Typography>
                    )
                  }

                <MUI.TextField  
                required
                fullWidth
                label="Password"
                margin="normal"
                variant="outlined"
                type="password"
                value={password.value}
                onChange={password.changeHandler}
                />

                  
                  {
                    password.error&&(
                      <Typography color="error" variant="caption">
                        {password.error}
                      </Typography>
                    )
                  }
               

                <MUI.Button
                  sx={{marginTop:"1rem"}}
                  variant="contained"//contained se blue color ki button
                  color="primary"
                  type="submit"
                  fullWidth
                >Sign Up</MUI.Button>

                <Typography textAlign={"center"} margin={"1rem"}>OR</Typography>
                
                <MUI.Button
                  // sx={{marginTop:"1rem"}}
                  variant="text"//contained se blue color ki button
                  color="primary"
                  type="submit"
                  fullWidth
                  onClick={toggleLogin}

                >Log In Instead </MUI.Button>
              </form>
              
              </>
            )
          }
      </Paper>
    </Container>

    </div>
  )
  
};

export default Login