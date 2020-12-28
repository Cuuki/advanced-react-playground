import React, {useState} from 'react';
import Button from '../../components/Button';

//TODO: forward ref implementation and typing
const getComponentDisplayName = <TProps extends unknown>(
  Component?: React.ComponentType<TProps>
): string => Component?.displayName || Component?.name || 'Component';

const injectProps = <TProps extends React.PropsWithoutRef<any>>(
  injectedProps: TProps
) => (WrappedComponent: React.ComponentType<TProps>) => {
  const InjectProps: React.FC<TProps> = (props) => (
    <WrappedComponent {...injectedProps} {...(props as TProps)} />
  );

  InjectProps.displayName = `injectProps(${getComponentDisplayName(
    WrappedComponent
  )})`;

  return InjectProps;
};

const renderConditionally = <
  TProps extends React.PropsWithoutRef<any>,
  SProps extends React.PropsWithoutRef<any>
>(
  test: boolean,
  ComponentOnPass: React.ComponentType<TProps>,
  ComponentOnFail: React.ComponentType<SProps>
) => {
  const RenderConditionally: React.FC<TProps | SProps> = (props) =>
    test ? (
      <ComponentOnPass {...(props as TProps)} />
    ) : (
      <ComponentOnFail {...(props as SProps)} />
    );

  RenderConditionally.displayName = `renderConditionally(${
    test
      ? getComponentDisplayName(ComponentOnPass)
      : getComponentDisplayName(ComponentOnFail)
  })`;

  return RenderConditionally;
};

interface LoadingProps {
  message: string;
}

const LoaderComponent: React.FC<LoadingProps> = ({message}) => <p>{message}</p>;

interface WithLoaderProps {
  isLoading: boolean;
  loadingMessage: string;
}

const withLoader = <
  TProps extends React.PropsWithoutRef<WithLoaderProps> = WithLoaderProps
>(
  WrappedComponent: React.ComponentType<TProps>
) => {
  const WithLoader: React.FC<TProps> = ({
    isLoading,
    loadingMessage,
    ...props
  }) =>
    renderConditionally(
      isLoading,
      injectProps<LoadingProps>({message: loadingMessage})(LoaderComponent),
      WrappedComponent
    )(props as TProps);

  WithLoader.displayName = `withLoader(${getComponentDisplayName(
    WrappedComponent
  )})`;

  return WithLoader;
};

interface ActualComponentProps {
  text: string;
}

const ActualComponent: React.FC<ActualComponentProps> = ({text}) => (
  <p>I am the actual component {text}.</p>
);

const ExampleComponentWithLoader = withLoader<
  ActualComponentProps & WithLoaderProps
>(ActualComponent);

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
        text="Mate"
      />
    </>
  );
};

export default HigherOrderComponentsExample;
