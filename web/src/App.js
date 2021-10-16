import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import esLocale from 'date-fns/locale/es';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink
} from "react-router-dom";
import AddWorkingTimeScreen from './AddWorkingTimeScreen';
import HomeScreen from './HomeScreen';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://aaron.com.es/">
        Aarón
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

function App() {

  const [records, setRecords] = React.useState({
    '12/10/2021': { startTime: 0, endTime: 0, normal: 1, extra: 0 },
    '13/10/2021': { startTime: 0, endTime: 0, normal: 1, extra: 0 },
    '14/10/2021': { startTime: 0, endTime: 0, normal: 1, extra: 0 },
    '15/10/2021': { startTime: 0, endTime: 0, normal: 1, extra: 0 },
  });

  const addRecord = (record) => {
    let date = (new Date(record.startTime)).toLocaleDateString('es-ES');
    setRecords({...records, [date]: record});
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Router>
        <div>
          <RouterLink to="/">Home</RouterLink>  <RouterLink to="/add">Add</RouterLink> 
        </div>
        <Switch>
          <Route path="/add">
            <AddWorkingTimeScreen addRecord={addRecord}/>
          </Route>
          <Route path="/">
            <HomeScreen records={records}/>
          </Route>
        </Switch>
      </Router>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  </LocalizationProvider>
    );
}

export default App;
