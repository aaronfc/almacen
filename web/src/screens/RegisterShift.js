import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {NORMAL_RATE, EXTRA_MORNING_RATE, HOUR_RATE_INFO, EXTRA_AFTERNOON_RATE} from '../HourRate';
import {useHistory} from "react-router-dom";

function RegisterShift(props) {
    let history = useHistory();
    const [startTime, setStartTimeValue] = React.useState(new Date().setHours(14, 0, 0));
    const [endTime, setEndTimeValue] = React.useState(null);
    const [hoursData, setHoursDataValue] = React.useState({
        [NORMAL_RATE]: {hours: 0, minutes: 0},
        [EXTRA_MORNING_RATE]: {hours: 0, minutes: 0},
        [EXTRA_AFTERNOON_RATE]: {hours: 0, minutes: 0},
    });

    const handleChangeStartTime = (newValue) => {
        setStartTimeValue(newValue);
        let newEndTime = newValue.getTime() + 8 * 3600 * 1000;
        handleChangeEndTime(new Date(newEndTime));
    };
    const handleChangeEndTime = (newEndTime) => {
        setEndTimeValue(newEndTime);
        let timeDiff = Math.abs(newEndTime - startTime);
        let hours = Math.floor(timeDiff / 3600 / 1000);
        let minutes = Math.floor((timeDiff % 3600000) / 60000);
        setHoursDataValue({...hoursData, [NORMAL_RATE]: {hours: hours, minutes: minutes}});
    };

    const handleChange = (hourRateType, unit) => (event) => {
        let newValue = parseInt(event.target.value);
        if (!isNaN(newValue)) {
            setHoursDataValue({...hoursData, [hourRateType]: {...hoursData[hourRateType], [unit]: newValue}});
        }
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
            date: startTime.toISOString().split('T')[0], // YYYY-MM-DD
            startTime: startTime,
            endTime: endTime,
            rated: {
                [NORMAL_RATE]: hoursData[NORMAL_RATE],
                [EXTRA_MORNING_RATE]: hoursData[EXTRA_MORNING_RATE],
                [EXTRA_AFTERNOON_RATE]: hoursData[EXTRA_AFTERNOON_RATE],
            }
        });

        history.push("/");
    };

    const handleFocus = (e) => e.target.select();

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Nueva jornada
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
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
                        <Grid item xs={12} key={hourKey}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                                        {hourInfo.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Horas"
                                        name={hourKey}
                                        size="small"
                                        id={"outlined-adornment-" + hourKey}
                                        value={hoursData[hourKey].hours}
                                        onChange={handleChange(hourKey, "hours")}
                                        onFocus={handleFocus}
                                        onClick={handleFocus}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Minutos"
                                        name={hourKey}
                                        size="small"
                                        id={"outlined-adornment-" + hourKey}
                                        value={hoursData[hourKey].minutes}
                                        onChange={handleChange(hourKey, "minutes")}
                                        onFocus={handleFocus}
                                        onClick={handleFocus}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    disabled={startTime === null || endTime === null}
                >
                    Guardar
                </Button>
            </Box>
        </Box>
    );
}

export default RegisterShift;
