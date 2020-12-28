import React, {useCallback, useState} from 'react';
import Switch from '../../components/Switch';

interface ToggleProps {
  on?: boolean;
  onToggle: (on: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({on, onToggle}) => {
  const [internalOn, setInternalOn] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (on !== undefined) {
      onToggle(!on);

      return;
    }

    setInternalOn((prevOn) => {
      const newOn = !prevOn;

      onToggle(newOn);

      return newOn;
    });
  }, [on, onToggle]);

  return <Switch on={on !== undefined ? on : internalOn} onClick={toggle} />;
};

const ControlPropsExample: React.FC = () => {
  const [on, setOn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('off');

  const handleToggle = useCallback((on) => {
    setOn(on);
    setInputValue(on ? 'on' : 'off');
  }, []);

  const handleChange = useCallback(({target: {value}}) => {
    if (value === 'on') {
      setOn(true);
    } else if (value === 'off') {
      setOn(false);
    }

    setInputValue(value);
  }, []);

  return (
    <div>
      <input value={inputValue} onChange={handleChange} />
      <Toggle on={on} onToggle={handleToggle} />
      <Toggle onToggle={handleToggle} />
    </div>
  );
};

export default ControlPropsExample;
