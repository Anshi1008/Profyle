// import React, { Suspense, lazy } from 'react'
// import {AppBar, Box, Icon, IconButton, Toolbar,Tooltip,Typography} from "@mui/material";
// // import {orange} from '../constants/color';
// // import "./constants/color.js";
// // import {orange,red} from "@mui/material/colors";
// import {useState} from "react"
// import {Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Menu as MenuIcon,Notifications as NotificationsIcon,Search as SearchIcon} from "@mui/icons-material"

// import { useNavigate } from 'react-router-dom';
// // import SearchDialog from '../specific/SearchDialog';





// // box=
// //    similar to div, but provide spacing,alignment,styling option
// // AppBar=
// //    fixed position bar used as header
// // Toolbar=
// //    container for AppBar, or standalone component,
// // Tooltip=
// //    provide info when hover over an elem inside it

// const SearchDialog=lazy(()=>{
// //   import("../specific/SearchDialog.jsx");
// })
// const Notifications=lazy(()=>{
// //   import("../specific/Notifications.jsx");
// })
// const NewGroup=lazy(()=>{
// //   import("../specific/NewGroup.jsx");
// })




// const Header = () => {
//   // return (
//   //   <div>Header</div>
//   // )

//   const [isMobile,setIsMobile]=useState(false);
//   const [isSearch,setIsSearch]=useState(false);
//   const [isNewGroup,setIsNewGroup]=useState(false);
//   const [isNotification,setIsNotification]=useState(false);



//   const handleMobile=()=>{
//     // console.log("mobile");
//     setIsMobile((prev)=>!(prev));
//   }
//   const openSearch=()=>{
//     // console.log("search");
//     setIsSearch((prev)=>!(prev));
//   }
//   const openNewGroup=()=>{
//     // console.log("newgroup");
//     setIsNewGroup((prev)=>!(prev));
//   }
//   const manageGroup=()=>{
//     // console.log("mangegroup");
    
//   }
//   // const navigateToGroup=()=>{
//   //   console.log("navigate");
//   // }

//   const navigate= useNavigate();

//   const navigateToGroup=()=>{
//     // navigate("/groups");
//   }

//   const logoutHandler=()=>{
//     console.log("logout");
//   }
//   const openNotification=()=>{
//     setIsNotification((prev)=>!(prev));
//   }

  

//     return <>

//         {/* div==box */}

//         <Box
//         sx={{flexGrow:1,
//             bgcolor:""}}
//         height={"4rem"}

//         >
//           <AppBar
//           position="static"
//           sx={{
//             bgcolor:"#ea7070",
//             // bgcolor:orange
//           }}
//           >
//             {/* asmitappbar */}
//             <Toolbar
//             sx={{
//               // bgcolor:"black",
//             }}
//             >
//               <Typography
//               variant="h5"
//               sx={{
//                 display:{xs:"none",sm:"block"},
//                 // bgcolor:"yellow",
//               }}
//               >
//                 ChatApp
//               </Typography>


//               {/* jb screen choti tb header ke side me icon */}
//               <Box
//               sx={{
//                 display:{xs:"block",
//                 sm:"none",
//                 bgcolor:"gold",
//               }
//               }}
//               >
//                 <IconButton color="inherit" onClick={handleMobile}>

//                   <MenuIcon/>

//                 </IconButton>
//               </Box>
              
//               {/* final box ko side me isliye beech me ek box jiska flexGrow=1 */}

//               <Box
//               sx={{
//                 bgcolor:"red",
//                 flexGrow:1,
//                 // width:"50%"
//                 // widht:"6rem",
//               }}
//               />

//               <Box>

//                   {/* <Tooltip title="Search">

//                       <IconButton color="inherit" size="large" onClick={openSearchDialog}>

                    
//                           <SearchIcon/>

//                       </IconButton>
//                   </Tooltip> */}
//                   <IconBtn title={"Search"} icon={<SearchIcon/>} onClick={openSearch}/>


//                   {/* <IconButton color="inherit" size="large" onClick={openNewGroup}>

//                       <AddIcon/>
                      

//                   </IconButton> */}

//                   {/* <Tooltip title="New Group" >

//                     <IconButton color="inherit" size="large" onClick={openNewGroup}>

//                         <AddIcon/>


//                     </IconButton>

//                   </Tooltip> */}
//                   <IconBtn title={"New Group"} icon={<AddIcon/>} onClick={openNewGroup} />

//                   {/* <Tooltip title="Manage Group">
//                       <IconButton color="inherit" size="large" onClick={navigateToGroup}>

//                           <Group/>
//                       </IconButton>
//                   </Tooltip> */}

//                   {/* <IconBtn></IconBtn> */}
//                   <IconBtn title={"Manage Group"} icon={<GroupIcon/>} onClick={navigateToGroup} />
                
//                   <IconBtn title={"Notifications"} icon={<NotificationsIcon/>} onClick={openNotification} />
                  
//                   <IconBtn title={"Logout"} icon={<LogoutIcon/>} onClick={logoutHandler} />
//               </Box>

//             </Toolbar>
//           </AppBar>

//           {/* asmitbox */}
//         </Box>

//         {
//           isSearch&&(
//             // <SearchDialog/>
//             <Suspense fallback={<div>Loading...</div>}>
//               <SearchDialog/>
//             </Suspense>
//           )
//         }

        
//         {
//           isNotification&&(
//             // <SearchDialog/>
//             <Suspense fallback={<div>Loading...</div>}>
//               <Notifications/>
//             </Suspense>
//           )
//         }


//         {
//           isNewGroup&&(
//             // <SearchDialog/>
//             <Suspense fallback={<div>Loading...</div>}>
//               <NewGroup/>
//             </Suspense>
//           )
//         }


//     </>
// }


// // iconbtn neeche kuki tabhi onClick func ki value pta hogi
// const IconBtn=({title,icon,onClick})=>{
//   return (
//     <Tooltip title={title}>
//       <IconButton color="inherit" size="large" onClick={onClick} >
//         {icon}
//       </IconButton>
//     </Tooltip>
//   )
// }


// export default Header