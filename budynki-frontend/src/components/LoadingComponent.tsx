import { UseQueryResult } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";

interface LoadingComponentProps {
  queryResult: UseQueryResult<unknown, Error> | {isSuccess?: unknown, isLoading?: unknown};
  children?: ReactNode;
}

export default function LoadingComponent({ // Typescript nie wykrywa tego jakbym chciał
  queryResult,
  children,
}: LoadingComponentProps) {
  return (
    <>
      {queryResult.isSuccess ? (
        children
      ) : queryResult.isLoading ? (
        <div className="flex items-center justify-center">
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span className="text-red-700">Error!</span>
        </div>
      )}
    </>
  );
}
