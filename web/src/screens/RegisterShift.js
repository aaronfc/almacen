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
import { HOUR_RATE_NORMAL, HOUR_RATE_EXTRA_MORNING, HOUR_RATE_INFO } from '../HourRate';


function RegisterShift(props) {
  const [startTime, setStartTimeValue] = React.useState(new Date().setHours(14, 0, 0));
  const [endTime, setEndTimeValue] = React.useState(new Date().setHours(22, 0, 0));
  const [hoursData, setHoursDataValue] = React.useState({
    [HOUR_RATE_NORMAL]: 0,
    [HOUR_RATE_EXTRA_MORNING]: 0,
  });
  
  const handleChangeStartTime = (newValue) => {
    setStartTimeValue(newValue);
    let newEndTime = newValue.getTime() + 8*3600*1000;
    handleChangeEndTime(new Date(newEndTime));
  };
  const handleChangeEndTime = (newValue) => {
    setEndTimeValue(newValue);
    setHoursDataValue({ ...hoursData, [HOUR_RATE_NORMAL]: (endTime - startTime) / 3600 / 1000})
  };

  const handleChange = (prop) => (event) => {
    let newHourValue = event.target.value;
    setHoursDataValue({ ...hoursData, [prop]: newHourValue});
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    /*const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      startTime: data.get('start-time'),
      endTime: data.get('end-time'),
      normal: data.get('normal'),
      'extra-morning': data.get('extra-morning'),
    });
    */
   let startDate = new Date(startTime);
   props.addRecord({
      startTime: startTime,
      endTime: endTime,
      normal: hoursData[HOUR_RATE_NORMAL],
      'extra-morning': hoursData[HOUR_RATE_EXTRA_MORNING],
    });
  };

  return (
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Nueva jornada
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DateTimePicker
                label="Entrada"
                name="start-time"
                value={startTime}
                onChange={handleChangeStartTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12}>
              <DateTimePicker
                label="Salida"
                name="end-time"
                value={endTime}
                onChange={handleChangeEndTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            {Object.entries(HOUR_RATE_INFO).map(([hourKey, hourInfo]) => 
              <Grid item xs={12}>
                <TextField
                  label={hourInfo.name}
                  name={hourKey}
                  id={"outlined-adornment-" + hourKey}
                  value={hoursData[hourKey]}
                  onChange={handleChange(hourKey)}
                  aria-describedby="outlined-weight-helper-text"
                />
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    );
}

export default RegisterShift;
