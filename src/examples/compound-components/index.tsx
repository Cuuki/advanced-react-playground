import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Switch from '../../components/Switch';

interface ToggleContextShape {
  on: boolean;
  toggle: () => void;
}

const ToggleContext = createContext<ToggleContextShape>({
  on: false,
  toggle: () => {},
});

const useToggleContext = (): ToggleContextShape => {
  const context = useContext(ToggleContext);

  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`
    );
  }

  return context;
};

const useEffectAfterMount = (
  cb: React.EffectCallback,
  dependencies: any[]
): void => {
  const justMounted = useRef<boolean>(true);

  useEffect(() => {
    if (!justMounted.current) {
      return cb();
    }

    justMounted.current = false;
  }, [cb, dependencies]);
};

interface ToggleOnProps {
  children: React.ReactNode;
}

const ToggleOn: React.FC<ToggleOnProps> = ({children}) => {
  const {on} = useToggleContext();

  return on ? <>{children}</> : null;
};

interface ToggleOffProps {
  children: React.ReactNode;
}

const ToggleOff: React.FC<ToggleOffProps> = ({children}) => {
  const {on} = useToggleContext();

  return on ? null : <>{children}</>;
};

interface ToggleButtonProps {}

const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
  const {on, toggle} = useToggleContext();

  return <Switch on={on} onClick={toggle} {...props} />;
};

interface IToggleComposition {
  On: React.FC<ToggleOnProps>;
  Off: React.FC<ToggleOffProps>;
  Button: React.FC<ToggleButtonProps>;
}

interface ToggleProps {
  onToggle: (on: boolean) => void;
}

const Toggle: React.FC<ToggleProps> & IToggleComposition = ({
  onToggle,
  children,
}) => {
  const [on, setOn] = useState<boolean>(false);
  const toggle = useCallback(() => setOn((prevOn) => !prevOn), []);

  useEffectAfterMount(() => {
    onToggle(on);
  }, [on]);

  const contextValue = useMemo(() => ({on, toggle}), [on, toggle]);

  return (
    <ToggleContext.Provider value={contextValue}>
      {children}
    </ToggleContext.Provider>
  );
};

Toggle.On = ToggleOn;
Toggle.Off = ToggleOff;
Toggle.Button = ToggleButton;

const CompoundComponentsExample: React.FC = () => (
  <Toggle onToggle={(on) => console.log(on)}>
    <Toggle.Button />
    <div>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
    </div>
  </Toggle>
);

export default CompoundComponentsExample;
