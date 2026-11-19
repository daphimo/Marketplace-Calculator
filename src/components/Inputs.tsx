import type {CalculatorConfig} from '../types/calculator';
type Props={label:string;value:number;onChange:(n:number)=>void;kind?:'currency'|'percent'|'number';hint?:string};
export function NumberInput({label,value,onChange,kind='currency',hint}:Props){return <label className="field"><span>{label}</span><span className="input-wrap"><b aria-hidden>{kind==='currency'?'₹':kind==='percent'?'%':'#'}</b><input type="number" min="0" step="0.01" value={value} onChange={e=>onChange(Math.max(0,Number(e.target.value)||0))}/></span>{hint&&<small>{hint}</small>}</label>}
export const makeUpdater=(update:<K extends keyof CalculatorConfig>(k:K,v:CalculatorConfig[K])=>void)=><K extends keyof CalculatorConfig>(k:K)=>(n:number)=>update(k,n as CalculatorConfig[K]);
