import React, {useState} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {useFetch} from 'use-http';

interface DataShape {
  name: string;
}

const ComponentDisplayingData: React.FC<{data: DataShape}> = ({data}) => (
  <p>Thank you {data.name.toUpperCase()} for reaching out!</p>
);

const Button: React.FC<{
  handleClick: () => void;
  color?: 'green' | 'yellow';
}> = ({handleClick, color = 'green', children}) => (
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
    ].join(' ')}>
    {children}
  </button>
);

const Index: React.FC = () => {
  const [data, setData] = useState<DataShape>({name: ''});
  const {get, response} = useFetch<DataShape>(
    'https://jsonplaceholder.typicode.com'
  );

  const loadData = async (endpoint: string) => {
    const data = await get(endpoint);

    if (response.ok) {
      setData(data);
    }
  };

  return (
    <>
      <Button handleClick={async () => await loadData('/')}>
        Reach out to us!
      </Button>

      <ErrorBoundary
        FallbackComponent={({resetErrorBoundary}) => (
          <Button color="yellow" handleClick={resetErrorBoundary}>
            Try again
          </Button>
        )}
        onReset={async () => await loadData('/users/1')}
        resetKeys={[data]}>
        <ComponentDisplayingData data={data} />
      </ErrorBoundary>
    </>
  );
};

export default Index;
