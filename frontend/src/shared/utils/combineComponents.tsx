import React from "react";

export const combineProviders =
  (...providers: React.ComponentType<{ children: React.ReactNode }>[]) =>
  ({ children }: { children: React.ReactNode }) =>
    providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children,
    );
