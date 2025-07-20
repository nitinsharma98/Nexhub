import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";


function Themebtn ({theme , setTheme}){

    const dark = () => {
        setTheme("dark");
    }

    const light = () => {
        setTheme("light");
    }

    return(
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab sx={{ backgroundColor: ' rgba(255, 208, 208, 0.8)', '&:hover': { backgroundColor: ' rgba(255, 255, 255, 0.8)' } }} >
                {
                theme === "dark" ?
                <BsFillSunFill onClick={light} className='navicon' /> :  
                <BsFillMoonFill onClick={dark} className='navicon' />
                }
            </Fab>
        </Box>
    )


}

export default Themebtn;