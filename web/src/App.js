import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import esLocale from 'date-fns/locale/es';
import {NORMAL_RATE, EXTRA_MORNING_RATE, EXTRA_AFTERNOON_RATE} from './HourRate';
import api from "./api";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink
} from "react-router-dom";
import RegisterShift from './screens/RegisterShift';
import Home from './screens/Home';
import CircularProgress from "@mui/material/CircularProgress";

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

  const [records, setRecords] = React.useState(null);
  const [isFetching, setFetching] = React.useState(true);

  api.getAllShifts("mageles").then(records => setRecords(records));

  // const [records, setRecords] = React.useState({
  //   '12/10/2021': { startTime: 0, endTime: 0, rated: {[NORMAL_RATE]: {hours: 8, minutes: 0} } },
  //   '13/10/2021': { startTime: 0, endTime: 0, rated: {[NORMAL_RATE]: {hours: 8, minutes: 0} } },
  //   '14/10/2021': { startTime: 0, endTime: 0, rated: {[NORMAL_RATE]: {hours: 8, minutes: 0} } },
  //   '15/10/2021': { startTime: 0, endTime: 0, rated: {[NORMAL_RATE]: {hours: 8, minutes: 0}, [EXTRA_MORNING_RATE]: {hours: 1, minutes: 15} } },
  // });

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
          <RouterLink to="/">Inicio</RouterLink> | <RouterLink to="/add">Añadir</RouterLink>
        </div>
        <Switch>
          <Route path="/add">
            <RegisterShift addRecord={addRecord}/>
          </Route>
          <Route path="/">
            {records == null ? <CircularProgress /> : <Home records={records}/>}
          </Route>
        </Switch>
      </Router>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  </LocalizationProvider>
    );
}

export default App;
