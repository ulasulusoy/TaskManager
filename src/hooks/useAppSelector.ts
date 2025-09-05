import { useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../store';

// Use this hook instead of plain useSelector to get proper types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
