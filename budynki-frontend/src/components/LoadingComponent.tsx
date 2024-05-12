import { UseQueryResult } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";

interface LoadingComponentProps {
  result: UseQueryResult<unknown, Error>;
  children?: ReactNode;
}

export default function LoadingComponent({ // Typescript nie wykrywa tego jakbym chciał, jak nie wymyslę jak to zrobić to do usunięcia
  result,
  children,
}: LoadingComponentProps) {
  return (
    <>
      {result.isSuccess ? (
        children
      ) : result.isLoading ? (
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
