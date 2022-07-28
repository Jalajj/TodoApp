import React from 'react';
import './button.css'

const buttonTypes = {
  primary: 'primary',
  secondary: 'secondary',
};

function Button({ type, variant = 'primary', children, ...rest }) {
  return (
    <button
    style={{margin:20}}
      type={type === 'submit' ? 'submit' : 'button'}
      className='button'
    //   className={getClasses([
    //     styles.button,
    //     styles[`button--${buttonTypes[variant]}`],
    //   ])}
      {...rest}
    >
      {children}
    </button>
  );
}

function SelectButton({ children, id, ...rest }) {
  return (
    <select
      id={id}
      className='button button__select'
    //   className={getClasses([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
