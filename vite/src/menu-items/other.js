// assets
import { IconBrandChrome, IconHelp,IconArticle, IconMessage } from '@tabler/icons-react';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

// constant
const icons = { IconBrandChrome, IconHelp, IconArticle, IconMessage, DashboardCustomizeIcon };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    
    {
      id: 'blog',
      title: 'Blog',
      type: 'item',
      url: '/articles',
      icon: IconArticle,
      breadcrumbs: false
    },
      {
      id: 'userDashboard',
      title: 'KPI Dashboard',
      type: 'item',
      url: '/userDashboard',
      icon: icons.DashboardCustomizeIcon,
      breadcrumbs: false
    },
    {
      id: 'comment',
      title: 'Témoignages',
      type: 'item',
      url: '/comment',
      icon: icons.IconMessage,
      breadcrumbs: false
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
