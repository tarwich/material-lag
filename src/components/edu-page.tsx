import { Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { VBox, VBoxProps } from './v-box';

export type EduPageProps = VBoxProps & {
  header?: ReactNode;
  children?: ReactNode;
};

export const EduPage = (props: EduPageProps) => {
  const { children, header, ...restProps } = props;

  return (
    <VBox {...restProps}>
      {header && <Typography variant="h4">{header}</Typography>}
      {children}
    </VBox>
  );
};
