import { memo, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../../graphql/queries';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import NavItem from './NavItem';
import otherMenu from '../../../menu-items/other'; // ← adapte ce chemin à ton projet
import NavGroup from './NavGroup';
import menuItems from 'menu-items';

import { useGetMenuMaster } from 'api/menu';

function MenuList() {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const [selectedID, setSelectedID] = useState('');

  const { data, loading, error } = useQuery(GET_ME);

  // Toujours appeler les hooks avant les returns
  const role = data?.me?.role || null;
  console.log('Role:', role); 

  const filteredItems = useMemo(() => {
  if (role === 'admin') return [...menuItems.items, otherMenu];

  if (role === 'user') {
    const utilitiesGroup = menuItems.items.find((group) => group.id === 'utilities');
    const bookEventItem = utilitiesGroup?.children?.find((i) => i.id === 'book-event');

    const userMenu = [];

    if (bookEventItem) {
      userMenu.push({
        ...utilitiesGroup,
        children: [bookEventItem]
      });
    }

    // Tous les utilisateurs voient le groupe "Témoignages", "Sample Page" et "Documentation"
    userMenu.push(otherMenu);

    return userMenu;
  }

  return [otherMenu]; // Cas sans rôle défini : montrer au moins Témoignages et Docs
}, [role]);


  if (loading) return null;
  if (error || !data?.me) return (
    <Typography variant="h6" color="error" align="center">
      Erreur de chargement du menu
    </Typography>
  );

  const navItems = filteredItems.map((item, index) => {
    switch (item.type) {
      case 'group':
        return (
          <NavGroup
            key={item.id}
            setSelectedID={setSelectedID}
            selectedID={selectedID}
            item={item}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <Box {...(drawerOpen && { sx: { mt: 1.5 } })}>{navItems}</Box>;
}

export default memo(MenuList);
