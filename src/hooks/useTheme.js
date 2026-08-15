import { useState } from 'react';
import { getStoredTheme, storeTheme } from '../app/theme';
export function useTheme(){ const [theme,setTheme]=useState(getStoredTheme); const toggleTheme=()=>{const next=theme==='dark'?'light':'dark';setTheme(next);storeTheme(next)};return{theme,toggleTheme}; }
