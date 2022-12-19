import './App.css'
import axios from 'axios'
import { useState } from 'react'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid';  
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'; 
import Typography from '@mui/material/Typography'; 
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';



function App() { 

  const [search, setSearch] = useState("");
  const [name, setName] = useState("Aguardando...");
  const [bio, setBio] = useState("Aguardando...");
  const [avatarUrl, setAvatarURL] = useState("Aguardando...");
  const [profileURL, setProfileURL] = useState("Aguardando...");
  const [location, setLocation] = useState("Aguardando...");
  const [blog, setBlog] = useState("Aguardando...");
  const [followers, setFollowers] = useState("Aguardando...");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4, 
  };

  const handleSearch = () => {
    axios.get(`https://api.github.com/users/${search}`)
     .then(res => {
      setName(res.data.name);
      setBio(res.data.bio);
      setAvatarURL(res.data.avatar_url);
      setProfileURL(res.data.url);
      setLocation(res.data.location)
      setBlog(res.data.blog)
      setFollowers(res.data.followers)
     })
     .catch(err => console.log(err))
    
    console.log(search);
  }


  const pegaClickPerfil = () => {
    console.log(name);
    console.log(bio);
    console.log(avatarUrl); 
  }


  return (

<Grid container spacing={0}> 

  <Grid item lg={8} xs={12}>
  
      <header className='header-top'>
          <ul>
              <Typography variant="body2" >Jovem Programador</Typography>
          </ul>
      </header>

      <Card sx={{ maxWidth: 850 }}>
        <Typography variant='h2'>Buscador de perfil do github</Typography>
        
        <CardContent>
        
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField   label="Digite o nome do usuário"
          variant="standard"
          onChange={(eventoAoDigitar) => { setSearch(eventoAoDigitar.target.value)}}
            />

          <span id='espacador'> <Button variant="contained" onClick={handleSearch}>Buscar</Button> </span>  
        </Box>
 
        </CardContent>
      </Card>
  
    </Grid>
          
          
    <Grid item xs={12} lg={4} >
        
      <div className="content"  onClick={handleOpen}>  
         <div>
                  <Avatar src={avatarUrl} alt="profile-image" sx={{ width: 256, height: 256 }} />
                  <Typography variant="h3" >{name}</Typography>
                  <Typography>{bio}</Typography>
          </div>
      </div>
  
    </Grid>
    
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Avatar src={avatarUrl} alt="profile-image" sx={{ width: 100, height: 100 }} />
          <Typography id="modal-modal-title" variant="h4" component="h2">   {name}  </Typography>
          <Typography>Bio:  {bio}</Typography>
          <Typography>Url: <a href={profileURL} > {profileURL}  </a> </Typography>
          <Typography>Location: {location}</Typography>
          <Typography>Blog: <a href={blog} > {blog} </a></Typography>
          <Typography>Total followers: {followers}</Typography>
        </Box>

    </Modal>


    </Grid>

    

  )
}

export default App
