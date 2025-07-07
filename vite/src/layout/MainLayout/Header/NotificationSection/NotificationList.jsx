import React from 'react';
import PropTypes from 'prop-types';

import { alpha, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { IconPhoto } from '@tabler/icons-react'; // example icon for all notifications

function ListItemWrapper({ children, onClick, read }) {
  const theme = useTheme();

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
        bgcolor: read ? 'background.paper' : alpha(theme.palette.primary.main, 0.15),
        '&:hover': {
          bgcolor: alpha(theme.palette.primary.main, 0.25)
        }
      }}
    >
      {children}
    </Box>
  );
}

export default function NotificationList({ notifications, onMarkAsRead }) {
  return (
    <List sx={{ width: '100%', maxWidth: { xs: 300, md: 330 }, py: 0 }}>
      {notifications.length === 0 && (
        <Typography sx={{ p: 2 }} variant="body2" align="center" color="text.secondary">
          Aucune notification
        </Typography>
      )}
      {notifications.map((notif) => (
        <ListItemWrapper
          key={notif.id}
          onClick={() => onMarkAsRead(notif.id)}
          read={notif.read}
        >
          <ListItem alignItems="center" disablePadding>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: notif.read ? 'grey.400' : 'primary.main', color: 'white' }}>
                <IconPhoto stroke={1.5} size="20px" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: notif.read ? 'normal' : '700' }}
                >
                  {notif.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                    noWrap
                  >
                    {notif.description}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {notif.time}
                  </Typography>
                </>
              }
            />
            {!notif.read && <Chip label="New" color="warning" size="small" sx={{ ml: 1 }} />}
          </ListItem>
        </ListItemWrapper>
      ))}
    </List>
  );
}

NotificationList.propTypes = {
  notifications: PropTypes.array.isRequired,
  onMarkAsRead: PropTypes.func.isRequired
};
