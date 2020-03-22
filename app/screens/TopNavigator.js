import {
  Icon,
  Layout,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';

const BackIcon = style => <Icon {...style} name="arrow-left" />;

const MenuIcon = style => <Icon {...style} name="menu" />;

const InfoIcon = style => <Icon {...style} name="information" />;

const LogoutIcon = style => <Icon {...style} name="logout" />;

export default function TopNavigationWithMenuShowcase() {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const menuData = [
    {
      title: 'About',
      icon: InfoIcon,
    },
    {
      title: 'Logout',
      icon: LogoutIcon,
    },
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onMenuItemSelect = index => {
    setMenuVisible(false);
  };

  const renderMenuAction = () => (
    <OverflowMenu
      placement="bottom end"
      visible={menuVisible}
      data={menuData}
      onSelect={onMenuItemSelect}
      onBackdropPress={toggleMenu}
    >
      <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
    </OverflowMenu>
  );

  const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;

  return (
    <Layout>
      <TopNavigation
        title="Application"
        alignment="center"
        leftControl={renderBackAction()}
        rightControls={renderMenuAction()}
      />
    </Layout>
  );
}
