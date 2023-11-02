import cx from "classnames";
import type { ReactElement } from "react";
import { getErrorMessage } from "../utils";

interface Properties {
  error?: Error;
  className?: string;
  loadingComponent?: React.ReactNode;
  retry?: () => void;
}
export default function LoadingOrError({
  error,
  className,
  loadingComponent,
  retry,
}: Properties): ReactElement {
  return (
    <div
      className={cx(
        `flex flex-col min-h-screen items-center justify-center `,
        className
      )}
    >
      <div
        className="text-xl my-4 text-center w-full dark:text-grey-main"
        data-testid="LoadingOrError"
      >
        {error ? (
          <span className="text-red-500">{getErrorMessage(error)}</span>
        ) : (
          loadingComponent ?? "Loading..."
        )}
      </div>
      {error && !!retry ? (
        <button
          onClick={retry}
          className="h-[40px] border border-dark-blue-700 text-dark-blue-700 p-2 flex items-center justify-center rounded-full px-4"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
