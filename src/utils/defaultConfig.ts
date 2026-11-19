import type { CalculatorConfig } from '../types/calculator';
export const DEFAULT_CONFIG: CalculatorConfig = {
  foodCost:100,labourCost:0,packagingCost:5,utilitiesCost:0,wastagePct:0,discountPct:0,advertisingCost:0,promotionalCost:0,freebieCost:0,
  desiredMarginPct:0,fixedProfit:50,useFixedProfit:true,existingPrice:200,serviceFeePct:26,paymentFeePct:1.84,serviceGstPct:18,paymentGstPct:18,
  serviceFeeBase:'gross',paymentFeeBase:'order',serviceGstItcPct:0,paymentGstItcPct:0,tdsPct:0,tcsPct:0,otherCharges:0,refundRecoveryPct:50,
  threshold1Pct:.5,penalty1Pct:10,threshold2Pct:2,penalty2Pct:25,discouragedPenalty:100000,weeklyOrders:0,weeklyRejected:0,rejectedOrderValue:0,supportRefundAmount:0,mode:'suggested'
};
