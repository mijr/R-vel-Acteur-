// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Services',
  icon: icons.IconKey,
  type: 'group',
  children: [
        {
          id: 'services',
          title: 'Services',
          type: 'item',
          url: '/services',
          target: true
        },
        // {
        //   id: 'register',
        //   title: 'register',
        //   type: 'item',
        //   url: '/pages/register',
        //   target: true
        // }
      ]
};

export default pages;
