import { Slice, createSelector } from '@reduxjs/toolkit';

export type RootSliceState<K extends string, S> = Pick<Record<K, S>, K>;

export type GetSliceName<S extends Slice> = S['name'];
export type GetSliceState<S extends Slice> = NonNullable<
  Parameters<S['reducer']>[0]
>;
export type GetRootSliceState<S extends Slice> = RootSliceState<
  GetSliceName<S>,
  GetSliceState<S>
>;

export type SelectSelf<S extends Slice> = (
  state: GetRootSliceState<S>
) => GetSliceState<S>;

export const createSliceSelectorWithTypes = <S extends Slice>(slice: S) =>
  createSelector.withTypes<GetRootSliceState<S>>();

export const createSelectSelf =
  <S extends Slice>(slice: S): SelectSelf<S> =>
  (state) =>
    state[slice.name as GetSliceName<S>];

export const createSelectFromSelf = <S extends Slice>(slice: S) => {
  const selectSelf = createSelectSelf(slice);

  return <T>(selector: (state: GetSliceState<S>) => T) =>
    (root: GetRootSliceState<S>) =>
      selector(selectSelf(root));
};
