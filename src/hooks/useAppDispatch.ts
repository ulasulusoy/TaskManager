import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

// Use this hook instead of plain useDispatch to get proper types
export const useAppDispatch = () => useDispatch<AppDispatch>();
