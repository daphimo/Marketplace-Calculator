import {useMemo,useState} from 'react';
import {DEFAULT_CONFIG} from '../utils/defaultConfig';
import {calculate} from '../utils/calculator';
import type {CalculatorConfig} from '../types/calculator';
export function usePricingCalculator(){const [config,setConfig]=useState<CalculatorConfig>({...DEFAULT_CONFIG});const result=useMemo(()=>calculate(config),[config]);const update=<K extends keyof CalculatorConfig>(key:K,value:CalculatorConfig[K])=>setConfig(p=>({...p,[key]:value}));const reset=()=>setConfig({...DEFAULT_CONFIG});const dirty=JSON.stringify(config)!==JSON.stringify(DEFAULT_CONFIG);return{config,result,update,reset,dirty};}
