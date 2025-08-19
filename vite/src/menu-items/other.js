// assets
import { IconBrandChrome, IconHelp,IconArticle, IconMessage } from '@tabler/icons-react';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { LocalOffer as IconOffer } from '@mui/icons-material';

// constant
const icons = { IconBrandChrome, IconHelp, IconArticle, IconMessage, DashboardCustomizeIcon, IconOffer };

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
      id: 'coupon',
      title: 'Coupons',
      type: 'item',
      url: '/coupon',
      icon: IconOffer,
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
    }
  ]
};

export default other;
