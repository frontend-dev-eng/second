import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

export const ShowTimer = ({ ExitTime }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  let interval;

  const deadline =ExitTime;

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const timeRemaining = Date.parse(deadline) - now;

    if (timeRemaining > 0) {
      setDays(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((timeRemaining / 1000 / 60) % 60));
      setSeconds(Math.floor((timeRemaining / 1000) % 60));
    } else {
      clearInterval(interval);
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
  };

  useEffect(() => {
    calculateTimeLeft();
    interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box className="timer">
      {(days === 0 && minutes === 0 && hours === 0 && seconds === 0) ? (
        <Typography></Typography>
      ) : (
        <>
          {days > 0 ? (
            <Typography className='timerUI'>{days}d {hours}h</Typography>
          ) : (
            <Typography className='timerUI'>{`${hours} : ${seconds === 0 ? minutes : minutes + 1}`}</Typography>
          )}
        </>
      )}
    </Box>
  );
};