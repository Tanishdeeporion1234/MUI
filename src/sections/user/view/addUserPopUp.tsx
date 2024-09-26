import React, { useState } from 'react';
import { Box, Button, Typography, TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import { Iconify } from 'src/components/iconify';

interface AddUserPopUpProps {
    onClose: () => void;
    onAddUser: (user: { name: string; company: string; role: string }) => void; 
}

const AddUserPopUp: React.FC<AddUserPopUpProps> = ({ onClose, onAddUser }) => {
    const [userData, setUserData] = useState({
        name: '',
        company: '',
        role: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const savedUserData = () => {
        onAddUser(userData); 
        setUserData({ name: '', company: '', role: '' }); 
        onClose();
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            zIndex='10'
            bgcolor="background.paper"
            p='30px'
            borderRadius='15px'
            width="90%"
            maxWidth="500px"
            boxShadow='3'
            position="absolute"
            top="50%"
            left='50%'
            marginLeft="-250px"
            marginTop="-250px"
            height="fit"
        >
            <Box display="flex" justifyContent="space-between" width="100%" alignItems="center" mb='2'>
                <Typography variant="h4" flexGrow={1}>
                    Add User
                </Typography>
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={savedUserData}
                >
                    Add user
                </Button>
                <Button onClick={onClose}>
                    <RxCross2 color='black' />
                </Button>
            </Box>

            <FormControl fullWidth margin="normal">
                <TextField 
                    label="Name" 
                    variant="outlined" 
                    fullWidth 
                    name="name"
                    value={userData.name}
                    onChange={handleChange} 
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <TextField 
                    label="Company" 
                    variant="outlined" 
                    fullWidth 
                    name="company"
                    value={userData.company}
                    onChange={handleChange} 
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Role</InputLabel>
                <Select 
                    labelId="role-label" 
                    label="Role" 
                    name="role"
                    value={userData.role}
                    onChange={handleSelectChange}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="Project Manager">Project Manager</MenuItem>
                    <MenuItem value="Hr Manager">Hr Manager</MenuItem>
                    <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
                    <MenuItem value="Full Stack Designer">Full Stack Designer</MenuItem>
                    <MenuItem value="UI Designer">UI Designer</MenuItem>
                    <MenuItem value="UI/UX Designer">UI/UX Designer</MenuItem>
                    <MenuItem value="Leader">Leader</MenuItem>
                    <MenuItem value="Front End Developer">Front End Developer</MenuItem>
                    <MenuItem value="Backend Developer">Backend Developer</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default AddUserPopUp;
