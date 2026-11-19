export type FeeBase = 'gross' | 'order' | 'discounted';
export type CalculationMode = 'suggested' | 'actual';
export interface CalculatorConfig {
  foodCost:number; labourCost:number; packagingCost:number; utilitiesCost:number; wastagePct:number;
  discountPct:number; advertisingCost:number; promotionalCost:number; freebieCost:number;
  desiredMarginPct:number; fixedProfit:number; useFixedProfit:boolean; existingPrice:number;
  serviceFeePct:number; paymentFeePct:number; serviceGstPct:number; paymentGstPct:number;
  serviceFeeBase:FeeBase; paymentFeeBase:FeeBase; serviceGstItcPct:number; paymentGstItcPct:number;
  tdsPct:number; tcsPct:number; otherCharges:number; refundRecoveryPct:number;
  threshold1Pct:number; penalty1Pct:number; threshold2Pct:number; penalty2Pct:number; discouragedPenalty:number;
  weeklyOrders:number; weeklyRejected:number; rejectedOrderValue:number; supportRefundAmount:number;
  mode:CalculationMode;
}
export interface CalculationResult {
  listingPrice:number; grossOrderValue:number; orderValue:number; discountedOrderValue:number;
  serviceFee:number; paymentFee:number; serviceGST:number; paymentGST:number; grossPlatformCharges:number;
  recoverableITC:number; effectivePlatformCost:number; discount:number; restaurantExpenses:number;
  totalDeductions:number; netSettlement:number; profit:number; profitMarginPct:number;
  rejectionPct:number; rejectionPenalty:number; refundRecovery:number; conditionalDeductions:number;
  tdsCredit:number; tcsCredit:number; valid:boolean; error?:string;
}
