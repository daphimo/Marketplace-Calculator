export const formatCurrency=(value:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(Number.isFinite(value)?value:0);
export const formatNumber=(value:number,digits=2)=>new Intl.NumberFormat('en-IN',{maximumFractionDigits:digits,minimumFractionDigits:digits}).format(Number.isFinite(value)?value:0);
