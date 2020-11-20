import { Box, BoxProps, useTheme } from '@material-ui/core';
import React from 'react';

export type HBoxProps = BoxProps & { grid?: boolean };

export const HBox = (props: HBoxProps) => {
  const { children, grid, ...restProps } = props;
  const theme = useTheme();

  if (grid) {
    return (
      <Box
        display="grid"
        gridAutoFlow="column"
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
      flexDirection="row"
      gridGap={theme.spacing(2)}
      {...restProps}
    >
      {children}
    </Box>
  );
};
