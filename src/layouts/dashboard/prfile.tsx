import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Avatar,
    IconButton,
    Switch,
    FormControlLabel,
    Grid,
    Paper,
    Tooltip,
    Modal,
    FilledInput
} from "@mui/material";
import { styled } from "@mui/system";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEdit, MdColorLens } from "react-icons/md";
import { InputAdornment } from "@mui/material";
import { Padding, Visibility, VisibilityOff } from "@mui/icons-material";
import { Input } from "@mui/material";



const ProfileContainer = styled(Container)(({ theme }) => ({
    background: 'linear-gradient(135deg, #f5f5f5 30%, #e0f7fa 90%)', // Light gray with a soft blue gradient
    height: '100vh',
    minWidth:'100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
}));

const ProfilePaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: '#fff', // White background for the card
    borderRadius: '12px', // Rounded corners
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)', // Slight hover effect
    },
}));

const AvatarWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    marginBottom: theme.spacing(2)
}));

const EditIconButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark
    }
}));

const SocialMediaContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2)
}));

const ModalContent = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius
}));

const Profile = () => {
    const [profileData, setProfileData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        bio: "Frontend Developer | React Enthusiast",
        twitter: "johndoe",
        linkedin: "johndoe",
        github: "johndoe",
        isPublic: true
    });
    const [errors, setErrors] = useState({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [modalPassword, setModalpassword] = useState('');
    const [avatarUrl, setAvatarUrl] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
        validateField(name, value);
    };

    const validateField = (name: any, value: string) => {
        let error = "";
        switch (name) {
            case "name":
                error = value.trim() === "" ? "Name is required" : "";
                break;
            case "email":
                error = !/^\S+@\S+\.\S+$/.test(value) ? "Invalid email format" : "";
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];  
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string; 
            setAvatarUrl(result); 
            localStorage.setItem('avatarUrl', result); 
          };
          reader.readAsDataURL(file);
        }
      };

      useEffect(() => {
        const savedAvatarUrl = localStorage.getItem('avatarUrl');
        if (savedAvatarUrl) {
          setAvatarUrl(savedAvatarUrl); 
        }
      }, []);

    const openModal = () => {
        setPasswordModal(true)
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsEditModalOpen(false);
    };

    const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setModalpassword(event.target.value); 
      };
    

    const handleOpenEdit =()=>{
        if (modalPassword === password) {
            setIsEditModalOpen(true)
            setPasswordModal(false);
            setModalpassword('')
        }
    }


    const email = localStorage.getItem('email');
    const userName = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    

    return (
        <ProfileContainer maxWidth="lg">
            <ProfilePaper elevation={3}>
                <AvatarWrapper>
                    <Avatar
                        alt={profileData.name}
                        src={avatarUrl}
                        sx={{ width: 120, height: 120 }}
                    />
                    <Tooltip title="Edit Profile Picture">
                        <EditIconButton size="small" component="label">
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                            <MdEdit />
                        </EditIconButton>
                    </Tooltip>
                </AvatarWrapper>

                <Typography variant="h4" gutterBottom>
                    {userName} || {email}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    {profileData.bio}
                </Typography>



                <SocialMediaContainer>
                    <IconButton
                        aria-label="Twitter"
                        color="primary"
                        href={`https://twitter.com/${profileData.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaTwitter />
                    </IconButton>
                    <IconButton
                        aria-label="LinkedIn"
                        color="primary"
                        href={`https://linkedin.com/in/${profileData.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedin />
                    </IconButton>
                    <IconButton
                        aria-label="GitHub"
                        color="primary"
                        href={`https://github.com/${profileData.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub />
                    </IconButton>
                </SocialMediaContainer>

                <Box mt={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={openModal}
                        startIcon={<MdEdit />}
                    >
                        Edit Profile
                    </Button>
                </Box>

                <Box mt={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={profileData.isPublic}
                                onChange={(e) =>
                                    setProfileData({
                                        ...profileData,
                                        isPublic: e.target.checked
                                    })
                                }
                                name="isPublic"
                                color="primary"
                            />
                        }
                        label="Public Profile"
                    />
                </Box>
            </ProfilePaper>

            <Modal
                open={passwordModal}
                onClose={() => setPasswordModal(false)}
                aria-labelledby="edit-profile-modal"
            >
                <ModalContent>
                    <Input
                        id="standard-adornment-password"
                        value={modalPassword}
                        onChange={handlePasswordChange} 
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Button
                    onClick={handleOpenEdit}
                    >
                        ok
                    </Button>
                </ModalContent>

            </Modal>

            <Modal 
             open={isEditModalOpen}
             onClose={() => setIsEditModalOpen(false)}
             aria-labelledby="edit-profile-modal"
            >


                <ModalContent>
                    <Typography variant="h6" gutterBottom>
                        Edit Profile
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={userName}
                                    onChange={handleInputChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleInputChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Bio"
                                    name="bio"
                                    multiline
                                    rows={3}
                                    value={profileData.bio}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Twitter"
                                    name="twitter"
                                    value={profileData.twitter}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="LinkedIn"
                                    name="linkedin"
                                    value={profileData.linkedin}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="GitHub"
                                    name="github"
                                    value={profileData.github}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={3} display="flex" justifyContent="flex-end">
                            <Button
                                type="button"
                                onClick={() => setIsEditModalOpen(false)}
                                sx={{ mr: 1 }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Save Changes
                            </Button>
                        </Box>
                    </form>
                </ModalContent>
            </Modal>
        </ProfileContainer>
    );
};

export default Profile;