import {useEffect,useState} from 'react';
import {Header} from './components/Header';
import {HelpDialog} from './components/HelpDialog';
import {PricingInputs} from './components/PricingInputs';
import {CalculationResults} from './components/CalculationResults';
import {SettingsDrawer} from './components/SettingsDrawer';
import {usePricingCalculator} from './hooks/usePricingCalculator';

const marketplaces=[{name:'Zomato',fee:26,payment:1.84},{name:'Swiggy',fee:25,payment:2},{name:'Amazon',fee:18,payment:2},{name:'Flipkart',fee:18,payment:2},{name:'Meesho',fee:15,payment:2},{name:'Myntra',fee:20,payment:2},{name:'Shopsy',fee:15,payment:2}];

export default function App(){
  const {config,result,update,reset,dirty}=usePricingCalculator();
  const [drawer,setDrawer]=useState(false),[help,setHelp]=useState(false),[marketplace,setMarketplace]=useState('Zomato'),[theme,setTheme]=useState<'day'|'night'>('day'),[toast,setToast]=useState('');
  useEffect(()=>{document.documentElement.dataset.theme=theme},[theme]);
  useEffect(()=>{document.title=`${marketplace} Price Calculator`},[marketplace]);
  const doReset=()=>{if(dirty&&!confirm('Restore every value to the defaults?'))return;reset();setToast('Calculator restored to defaults.');setTimeout(()=>setToast(''),2500)};
  const selectMarketplace=(name:string,fee:number,payment:number)=>{setMarketplace(name);update('serviceFeePct',fee);update('paymentFeePct',payment)};
  return <><a className="skip" href="#main">Skip to calculator</a><div className="app-shell"><Header marketplace={marketplace} theme={theme} onTheme={()=>setTheme(t=>t==='day'?'night':'day')} onHelp={()=>setHelp(true)} onReset={doReset} onSettings={()=>setDrawer(true)}/><main id="main"><div className="workspace"><PricingInputs c={config} update={update} marketplace={marketplace}/><CalculationResults r={result} marketplace={marketplace}/></div></main></div><nav className="market-tabs" aria-label="Marketplace calculators">{marketplaces.map(m=><button key={m.name} className={marketplace===m.name?'active':''} onClick={()=>selectMarketplace(m.name,m.fee,m.payment)}>{m.name}</button>)}</nav><SettingsDrawer open={drawer} onClose={()=>setDrawer(false)} c={config} r={result} update={update} marketplace={marketplace}/><HelpDialog open={help} onClose={()=>setHelp(false)}/>{toast&&<div className="toast" role="status">{toast}</div>}</>;
}
