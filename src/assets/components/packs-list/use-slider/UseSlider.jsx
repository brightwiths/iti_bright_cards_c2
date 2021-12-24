import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';


function ValueLabelComponent(props) {
   const { children, value } = props;
 
   return (
     <Tooltip enterTouchDelay={0} placement="top" title={value}>
       {children}
     </Tooltip>
   );
 }
 
 ValueLabelComponent.propTypes = {
   children: PropTypes.element.isRequired,
   value: PropTypes.number.isRequired,
 };
 
//  const marks = [
//    {
//      value: 0,
//    },
//    {
//      value: 4,
//    },
//    {
//      value: 112,
//    },
//    {
//      value: 140,
//    },
//  ];
 

 const UseSlider = styled(Slider)({
   color: '#21268F',
   height: 5,
   '& .MuiSlider-track': {
     border: 'none',
   },
   '& .MuiSlider-thumb': {
     height: 16,
     width: 16,
     backgroundColor: '#fff',
     border: '4px solid currentColor',
     '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
       boxShadow: 'inherit',
     },
     '&:before': {
       display: 'none',
     },
   },
   '& .MuiSlider-valueLabel': {
     lineHeight: 1.2,
     fontSize: 12,
     background: 'unset',
     padding: 0,
     width: 32,
     height: 24,
     borderRadius: 3,
     backgroundColor: '#21268F',    
     '&:before': { display: 'none' },     
   },
 });


 
 function valuetext(value) {
   return `${value}number`;
 }
 
 export default function RangeSlider() {
   const [value, setValue] = React.useState([4, 112]);
 
   const handleChange = (event, newValue) => {
     setValue(newValue);
   };
 
   return (
     <Box sx={{ width: 195 }}>
       <UseSlider
         // marks={marks}
         max={150}
         getAriaLabel={() => 'Number of cards'}
         value={value}
         onChange={handleChange}
         valueLabelDisplay="auto"
         getAriaValueText={valuetext}
       />
     </Box>
   );
 }
 


 