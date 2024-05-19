import { UseQueryResult } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";

interface LoadingComponentProps {
  queryResult:
    | UseQueryResult<unknown, Error>
    | UseQueryResult<unknown, Error>[];
  children?: ReactNode;
}

export default function LoadingComponent({
  // Typescript nie wykrywa sprawdzania wyników query poza elementem
  queryResult,
  children,
}: LoadingComponentProps) {
  const queryResultsArray = Array.isArray(queryResult)
    ? queryResult
    : [queryResult];
  return (
    <>
      {queryResultsArray.some((element) => element.isError == true) ? (
        <div className="flex items-center justify-center">
          <span className="text-red-700">Error!</span>
        </div>
      ) : queryResultsArray.every((element) => element.isSuccess == true) ? (
        children
      ) : (
        <div className="flex items-center justify-center">
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </div>
      )}
    </>
  );
}
