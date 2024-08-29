import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import FullScreenContext from 'mirador/dist/es/src/contexts/FullScreenContext';
import { KeyboardEventTypes, defaultShortcutMapping } from '../state/events';

/**  */
function Workspace(props) {
  const { TargetComponent, keyboardShortcuts } = props;
  const handle = useContext(FullScreenContext.Consumer);
  const toggleType = KeyboardEventTypes.TOGGLE_FULLSCREEN;

  useEffect(() => {
    /** checks if key for fullscreen is pressed and toggles fullscreen */
    const handleKeyDown = (event) => {
      const { key } = event;
      if (
        key === keyboardShortcuts.shortcutMapping[toggleType] ||
        defaultShortcutMapping[toggleType]
      ) {
        if (handle.node.current.className.includes('enabled')) {
          handle.exit();
        } else {
          handle.enter();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <TargetComponent {...props} />;
}

Workspace.propTypes = {
  TargetComponent: PropTypes.elementType.isRequired,
  keyboardShortcuts: PropTypes.objectOf(PropTypes.string),
};
Workspace.defaultProps = {
  keyboardShortcuts: {},
};

export default Workspace;
