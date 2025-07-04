// assets
import {
  IconCalendarEvent,
  IconCalendarPlus,
  IconPalette,
  IconShadow,
  IconUsers,
  IconWindmill
} from '@tabler/icons-react';

// constant
const icons = {
  IconCalendarEvent,
  IconCalendarPlus,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'view-appointments',
      title: 'Mes rendez-vous',
      type: 'item',
      url: '/AppointmentList',
      icon: icons.IconCalendarEvent,
      breadcrumbs: false
    },
    {
      id: 'book-event',
      title: 'Réserver un rendez-vous',
      type: 'item',
      url: '/BookEvent',
      icon: icons.IconCalendarPlus,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/color',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-users',
      title: 'Utilisateur',
      type: 'item',
      url: '/User',
      icon: icons.IconUsers,
      breadcrumbs: false
    }
  ]
};

export default utilities;
