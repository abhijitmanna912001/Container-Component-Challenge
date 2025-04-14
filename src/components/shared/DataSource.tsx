import React, { ReactNode, useEffect, useState } from "react";

interface DataSourceProps {
  getDataFunc?: () => Promise<unknown>;
  resourceName: string;
  children: ReactNode;
}

const DataSource = ({
  getDataFunc = async () => null,
  resourceName,
  children,
}: DataSourceProps) => {
  const [state, setState] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getDataFunc();
        setState(data);
      } catch {
        setError("Failed to fetch data");
      }
    })();
  }, [getDataFunc]);

  return (
    <>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { [resourceName]: state });
          }
          return child;
        })
      )}
    </>
  );
};

export default DataSource;
