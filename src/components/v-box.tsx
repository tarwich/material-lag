import { Box, BoxProps, useTheme } from '@material-ui/core';
import React from 'react';

export type VBoxProps = BoxProps & { grid?: boolean };

export const VBox = (props: VBoxProps) => {
  const { children, grid, ...restProps } = props;
  const theme = useTheme();

  if (grid) {
    return (
      <Box
        display="grid"
        gridAutoFlow="row"
        gridGap={theme.spacing(2)}
        {...restProps}
      >
        {children}
      </Box>
    );
  }
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
