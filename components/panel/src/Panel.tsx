import { FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { default as RPanel} from '@not-govuk/panel';

import '../assets/Panel.scss';

export type PanelProps = StandardProps & {
  /** Description for the 'heading' prop */
  title?: string
};

export const Panel: FC<PanelProps> = ({ children, classBlock, classModifiers = 'confirmation', className, title, ...attrs }) => {
  const classes = classBuilder('hods-panel', classBlock, classModifiers, className);

  return (
    <RPanel {...attrs} title={title || 'Panel'} classBlock={classBlock} classModifiers={classModifiers} className={className}>
      {children}
    </RPanel>
  );
};

export default Panel;