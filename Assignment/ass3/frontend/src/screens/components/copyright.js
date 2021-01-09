import React from 'react';
import Typography from '@material-ui/core/Typography';

/**
 * Use material-ui template to show editGame page， which is from the official document page :
 * https://material-ui.com/getting-started/templates/
 * and we make changes according to our own project,
 */
const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © COMP6080 Ass3 ${new Date().getFullYear()}.`}
    </Typography>
  );
}

export default Copyright;