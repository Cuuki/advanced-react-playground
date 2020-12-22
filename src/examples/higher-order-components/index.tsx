import React, {useState} from 'react';
import Button from '../../components/Button';

const getComponentDisplayName = (Component?: {
  displayName?: string;
  name?: string;
}): string => Component?.displayName || Component?.name || 'Component';

const hasProps = <T extends Record<string, any>>(
  injectedProps: Record<string, any>
) => (WrappedComponent: React.ComponentType<T>) => {
  const HasProps: React.FC<T> = (props) => (
    <WrappedComponent {...injectedProps} {...(props as T)} />
  );

  HasProps.displayName = `hasProps(${getComponentDisplayName(
    WrappedComponent
  )})`;

  return HasProps;
};

const branch = <T extends Record<string, any>, S extends Record<string, any>>(
  test: boolean,
  ComponentOnPass: React.ComponentType<T>,
  ComponentOnFail: React.ComponentType<S>
) => {
  const Branch: React.FC<T | S> = (props) =>
    test ? (
      <ComponentOnPass {...(props as T)} />
    ) : (
      <ComponentOnFail {...(props as S)} />
    );

  Branch.displayName = `branch(${
    test
      ? getComponentDisplayName(ComponentOnPass)
      : getComponentDisplayName(ComponentOnFail)
  })`;

  return Branch;
};

interface LoadingProps {
  message: string;
}

const LoaderComponent: React.FC<LoadingProps> = ({message}) => <p>{message}</p>;

interface HasLoaderProps {
  isLoading: boolean;
  loadingMessage: string;
}

const hasLoader = <T extends HasLoaderProps = HasLoaderProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const HasLoader: React.FC<T> = (props) =>
    branch(
      props.isLoading,
      hasProps<LoadingProps>({message: (props as T).loadingMessage})(
        LoaderComponent
      ),
      WrappedComponent
    )(props);

  HasLoader.displayName = `hasLoader(${getComponentDisplayName(
    WrappedComponent
  )})`;

  return HasLoader;
};

const ExampleComponentWithLoader = hasLoader(() => (
  <p>I am the actual component.</p>
));

const HigherOrderComponentsExample: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Button handleClick={() => setLoading((loading) => !loading)}>
        Click to toggle loading
      </Button>
      <ExampleComponentWithLoader
        isLoading={loading}
        loadingMessage="Some loading text..."
      />
    </>
  );
};

export default HigherOrderComponentsExample;
