import { Box, BoxProps, useTheme } from '@material-ui/core';
import React from 'react';

export type VBoxProps = BoxProps;

export const VBox = (props: VBoxProps) => {
  const { children, ...restProps } = props;
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gridGap={theme.spacing(2)}
      {...restProps}
    >
      {children}
    </Box>
  );
};
