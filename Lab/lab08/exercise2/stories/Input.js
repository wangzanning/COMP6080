import React from 'react';
import PropTypes from 'prop-types';

/**
 * Primary UI component for user interaction
 */
export const Input = ({ primary,size, ...props }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <Input
      type="text"
      className={['storybook-input', `storybook-input--${size}`, mode].join(' ')}
      // style={backgroundColor && { backgroundColor } }
      // size={size}
      {...props}
    >
      {/*{label}*/}
    </Input>
  );
};

Input.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  // backgroundColor: PropTypes.string,
  // /**
  //  * Button contents
  //  */
  // label: PropTypes.string.isRequired,
  // /**
  //  * Optional click handler
  //  */
  // color: PropTypes.string,
  // opacity: PropTypes.string,
  size: PropTypes.string,
  // width: PropTypes.string,
  // height: PropTypes.string,
};

Input.defaultProps = {
  size: '20',
};
