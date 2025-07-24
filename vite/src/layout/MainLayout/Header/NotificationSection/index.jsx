import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Avatar,
  Button,
  CardActions,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  Paper,
  Popper,
  Stack,
  Typography,
  Box
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList'; // Ensure it accepts props
import { LOCAL_STORAGE_KEY } from '../../../../constants/storageKeys'; // Adjust the import path as necessary

import { IconBell } from '@tabler/icons-react';

const CAL_API_URL = 'https://api.cal.com/v1/attendees?apiKey=cal_live_8aee1aa2c48670ea92d8fe14fcb4d077';
const FETCH_INTERVAL_MS = 60000; // 1 minute

// Helper functions for read state persistence
const getReadIds = () => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveReadIds = (ids) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
};

export default function NotificationSection() {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  // Fetch attendees from Cal.com and update notifications
  const fetchAttendees = async () => {
    try {
      const response = await fetch(CAL_API_URL);
      const data = await response.json();
      if (!data.attendees) return;

      const knownIds = notifications.map((n) => n.id);
      const readIds = getReadIds();

      const newAttendees = data.attendees.filter((att) => !knownIds.includes(att.id));
      if (newAttendees.length > 0) {
        const newNotifications = newAttendees.map((att) => ({
          id: att.id,
          title: `Nouvel inscrit : ${att.name}`,
          description: `Email: ${att.email}`,
          time: new Date().toLocaleString(),
          read: readIds.includes(att.id)
        }));
        setNotifications((prev) => [...newNotifications, ...prev]);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des inscrits:', err);
    }
  };

  // Load from localStorage on first mount
  useEffect(() => {
    const readIds = getReadIds();
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: readIds.includes(n.id)
      }))
    );
    fetchAttendees(); // initial fetch
    const intervalId = setInterval(fetchAttendees, FETCH_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  const markAsRead = (id) => {
    const readIds = getReadIds();
    if (!readIds.includes(id)) {
      saveReadIds([...readIds, id]);
    }
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    const allIds = notifications.map((n) => n.id);
    saveReadIds([...new Set([...getReadIds(), ...allIds])]);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <Box sx={{ ml: 2, position: 'relative', display: 'inline-flex' }}>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            transition: 'all .2s ease-in-out',
            bgcolor: 'secondary.light',
            color: 'secondary.dark',
            '&[aria-controls="menu-list-grow"],&:hover': {
              bgcolor: 'secondary.dark',
              color: 'secondary.light'
            }
          }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
        >
          <IconBell stroke={1.5} size="20px" />
        </Avatar>
        {unreadCount > 0 && (
          <Chip
            label={unreadCount}
            size="small"
            color="warning"
            sx={{
              position: 'absolute',
              top: 2,
              right: 2,
              minWidth: '20px',
              height: '20px',
              borderRadius: '10px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              pointerEvents: 'none'
            }}
          />
        )}
      </Box>

      <Popper
        placement={downMD ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [downMD ? 5 : 0, 20]
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions position={downMD ? 'top' : 'top-right'} in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item xs={12}>
                        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 2, px: 2 }}>
                          <Grid>
                            <Stack direction="row" spacing={2}>
                              <Typography variant="subtitle1">Notifications</Typography>
                              <Chip
                                size="small"
                                label={unreadCount.toString()}
                                sx={{ color: 'background.default', bgcolor: 'warning.dark' }}
                              />
                            </Stack>
                          </Grid>
                          <Grid>
                            <Typography
                              component="span"
                              variant="subtitle2"
                              color="primary"
                              onClick={markAllAsRead}
                              sx={{ cursor: 'pointer' }}
                            >
                              Tout marquer comme lu
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            height: '100%',
                            maxHeight: 'calc(100vh - 205px)',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            '&::-webkit-scrollbar': { width: 5 }
                          }}
                        >
                          <NotificationList notifications={notifications} onMarkAsRead={markAsRead} />
                        </Box>
                      </Grid>
                    </Grid>
                    <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                      <Button size="small" disableElevation component={Link} to="/notifications">
                        Voir tout
                      </Button>
                    </CardActions>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}
