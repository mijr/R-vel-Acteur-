// assets
import {
  IconCalendarEvent,
  IconCalendarPlus,
  IconPalette,
  IconShadow,
  IconUsers,
  IconWindmill,
  IconNews,
  IconCalendarStats,
  IconTools 

} from '@tabler/icons-react';


// constant
const icons = {
  IconCalendarEvent,
  IconCalendarPlus,
  IconCalendarStats ,
  IconPalette,
  IconShadow,
  IconNews, // ← ce champ doit être présent 
  IconWindmill,
  IconUsers,
  IconTools 

};


// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilite',
  type: 'group',
  children: [
    {
      id: 'util-services',
      title: 'Services',
      type: 'item',
      url: '/services',
      icon: icons.IconTools,
      breadcrumbs: false
    },
    {
      id: 'view-appointments',
      title: 'Mes rendez-vous',
      type: 'item',
      url: '/AppointmentList',
      icon: icons.IconCalendarEvent,
      breadcrumbs: false
    },
    {
      id: 'SociologicalDashboard',
      title: 'Progree sociologe',
      type: 'item',
      url: '/SociologicalDashboard',
      icon: icons.IconCalendarStats,
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
      id: 'util-news',
      title: 'Actualités',
      type: 'item',
      url: '/new',
      icon: icons.IconNews,
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
