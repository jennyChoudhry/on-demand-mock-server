import { Router } from 'express';
import { OK } from 'http-status-codes';
import { handleValidationFailure } from '../../errors';
import { validateKnownParams } from '../../validation/helpers';

export default function createRouter(log) {
  const router = new Router();

  // Creates a one-time payment
  // curl -X POST "http://localhost:4000/v1/payments" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"payment_profile_uuid\":\"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\"amount\":10,\"currency\":\"aed\"}"
  router.post('/', async (req, res, next) => {
    log.info(`POST ${req.url} ${JSON.stringify(req.body)}`);

    const knownParams = [ 'payment_profile_uuid', 'amount', 'currency' ];
    const unknownParamsErrors = validateKnownParams(knownParams, req.body);
    const validationResult = await req.getValidationResult();
    if (!validationResult.isEmpty() || unknownParamsErrors.length) {
      handleValidationFailure([ ...validationResult.array(), ...unknownParamsErrors ], res);
      return;
    }

    res.json({
      data: {
        uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        amount: 10,
        currency: 'usd',
        status: 'requires_payment_method',
        is_refunded: true,
        failure_code: 'string',
      },
    });
  });

  return router;
}
