import type { CalculatorConfig,CalculationResult,FeeBase } from '../types/calculator';
const pct=(n:number)=>Math.max(0,n)/100;
const baseValue=(base:FeeBase,gross:number,order:number,discounted:number)=>base==='gross'?gross:base==='order'?order:discounted;
const fixedExpenses=(c:CalculatorConfig)=>c.foodCost+c.labourCost+c.packagingCost+c.utilitiesCost+c.advertisingCost+c.promotionalCost+c.freebieCost;
export function calculateAtPrice(c:CalculatorConfig, price:number):CalculationResult {
  const p=Math.max(0,price), discount=p*pct(c.discountPct), order=p, discounted=Math.max(0,order-discount);
  const serviceFee=baseValue(c.serviceFeeBase,p,order,discounted)*pct(c.serviceFeePct);
  const paymentFee=baseValue(c.paymentFeeBase,p,order,discounted)*pct(c.paymentFeePct);
  const serviceGST=serviceFee*pct(c.serviceGstPct), paymentGST=paymentFee*pct(c.paymentGstPct);
  const grossPlatformCharges=serviceFee+paymentFee+serviceGST+paymentGST;
  const recoverableITC=serviceGST*pct(c.serviceGstItcPct)+paymentGST*pct(c.paymentGstItcPct);
  const effectivePlatformCost=grossPlatformCharges-recoverableITC;
  const restaurantExpenses=fixedExpenses(c)*(1+pct(c.wastagePct));
  const totalDeductions=grossPlatformCharges+discount+c.otherCharges;
  const netSettlement=p-totalDeductions;
  const profit=netSettlement-restaurantExpenses+recoverableITC;
  const rejectionPct=c.weeklyOrders>0?c.weeklyRejected/c.weeklyOrders*100:0;
  const rejectionPenalty=rejectionPct>c.threshold2Pct?c.rejectedOrderValue*pct(c.penalty2Pct):rejectionPct>c.threshold1Pct?c.rejectedOrderValue*pct(c.penalty1Pct):0;
  const refundRecovery=c.supportRefundAmount*pct(c.refundRecoveryPct);
  return {listingPrice:p,grossOrderValue:p,orderValue:order,discountedOrderValue:discounted,serviceFee,paymentFee,serviceGST,paymentGST,grossPlatformCharges,recoverableITC,effectivePlatformCost,discount,restaurantExpenses,totalDeductions,netSettlement,profit,profitMarginPct:p>0?profit/p*100:0,rejectionPct,rejectionPenalty,refundRecovery,conditionalDeductions:rejectionPenalty+refundRecovery,tdsCredit:p*pct(c.tdsPct),tcsCredit:p*pct(c.tcsPct),valid:Number.isFinite(profit)};
}
export function calculate(c:CalculatorConfig):CalculationResult {
  if(c.mode==='actual') return calculateAtPrice(c,c.existingPrice);
  const targetFixed=c.useFixedProfit?c.fixedProfit:0;
  let low=0,high=Math.max(1000,(fixedExpenses(c)+targetFixed)*5),result=calculateAtPrice(c,0);
  const goal=(r:CalculationResult)=>c.useFixedProfit?r.profit-c.fixedProfit:r.profitMarginPct-c.desiredMarginPct;
  while(goal(calculateAtPrice(c,high))<0&&high<1e8) high*=2;
  if(high>=1e8){result.valid=false;result.error='These rates leave no room for the requested profit.';return result;}
  for(let i=0;i<100;i++){const mid=(low+high)/2;result=calculateAtPrice(c,mid);if(goal(result)>=0)high=mid;else low=mid;}
  result=calculateAtPrice(c,high);result.listingPrice=high;return result;
}
