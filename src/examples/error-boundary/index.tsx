import React, {useState} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {useFetch} from 'use-http';
import Button from '../../components/Button';

interface DataShape {
  name: string;
}

const ComponentDisplayingData: React.FC<{data: DataShape}> = ({data}) => (
  <p>Thank you {data.name.toUpperCase()} for reaching out!</p>
);

const ErrorBoundaryExample: React.FC = () => {
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

export default ErrorBoundaryExample;
