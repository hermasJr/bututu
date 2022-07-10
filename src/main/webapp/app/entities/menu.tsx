import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/collaborator">
        <Translate contentKey="global.menu.entities.collaborator" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/client">
        <Translate contentKey="global.menu.entities.client" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/project">
        <Translate contentKey="global.menu.entities.project" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/proposal">
        <Translate contentKey="global.menu.entities.proposal" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/proposal-item">
        <Translate contentKey="global.menu.entities.proposalItem" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/ticket">
        <Translate contentKey="global.menu.entities.ticket" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/job">
        <Translate contentKey="global.menu.entities.job" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/timesheet">
        <Translate contentKey="global.menu.entities.timesheet" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu as React.ComponentType<any>;
