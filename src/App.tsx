import './App.css'
import axios from 'axios'
import { useState } from 'react'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid';  
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';


function App() { 

  const [search, setSearch] = useState("");
  const [name, setName] = useState("Aguardando...");
  const [bio, setBio] = useState("Aguardando...");
  const [avatarUrl, setAvatarURL] = useState("Aguardando...");

  const handleSearch = () => {
    axios.get(`https://api.github.com/users/${search}`)
     .then(res => {
      setName(res.data.name);
      setBio(res.data.bio);
      setAvatarURL(res.data.avatar_url);
     })
     .catch(err => console.log(err))
    
    console.log(search);
  }


  return (

<Grid container spacing={0}  > 

  <Grid item xs={8}>
  
      <header className='header-top'>
          <ul>
              <Typography variant="body2" >Jovem Programador</Typography>
          </ul>
      </header>

      <Card sx={{ maxWidth: 850 }}>
        <Typography variant='h2'>Buscador de perfil do github</Typography>
        
        <CardContent>
          <TextField 
                id="outlined-basic" 
                label="Digite o username" 
                variant="outlined"  
                onChange={(eventoAoDigitar) => { setSearch(eventoAoDigitar.target.value)}} />

                
          <Button variant="contained" onClick={handleSearch}>Buscar</Button>
        </CardContent>
      </Card>
  
    </Grid>
          
          
    <Grid item xs={4}>
        
      <div className="content">  
         <div>
                  <Avatar src={avatarUrl} alt="profile-image" sx={{ width: 256, height: 256 }} />
                  <Typography variant="h3" >{name}</Typography>
                  <Typography>{bio}</Typography>
          </div>
      </div>
  
    </Grid>
    
 
    </Grid>
  )
}

export default App
