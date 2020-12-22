import React from 'react';

const Button: React.FC<{
  handleClick: () => void;
  color?: 'green' | 'yellow';
}> = ({handleClick, color = 'green', children, ...props}) => (
  <button
    onClick={handleClick}
    className={[
      'mb-4',
      'mr-2',
      'py-2',
      'px-4',
      `bg-${color}-500`,
      'text-white',
      'font-semibold',
      'rounded-lg',
      'shadow-md',
      `hover:bg-${color}-700`,
      'focus:outline-none',
      'focus:ring-2',
      `focus:ring-${color}-400`,
      'focus:ring-opacity-75',
    ].join(' ')}
    {...props}>
    {children}
  </button>
);

export default Button;
