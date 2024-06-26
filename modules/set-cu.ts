import { MonetizationInboundPolicy, ZuploContext, ZuploRequest } from "@zuplo/runtime";

type MyPolicyOptionsType = {
  myOption: any;
};

export default async function policy(
  response: Response,
  request: ZuploRequest,
  context: ZuploContext,
  options: MyPolicyOptionsType,
  policyName: string
) {
  // your policy code goes here, and can use the options to perform any
  // configuration
  // See the docs: https://www.zuplo.com/docs/policies/custom-code-inbound

  const body = await response.clone().text();

  const count =  (body.match(/{/g) || []).length;

   MonetizationInboundPolicy.setMeters(context, {
    complexityUnits: count,
  });
 
  return response;
}