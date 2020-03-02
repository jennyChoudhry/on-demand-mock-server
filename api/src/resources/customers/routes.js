import { Router } from 'express';
import { handleValidationFailure } from '../../errors';
import { validateKnownParams } from '../../validation/helpers';

export default function createRouter(log) {
  const router = new Router();

  // Creates the customers in Stripe
  // curl -X POST "http://localhost:4000/api/v1/customers" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"account_uuid\":\"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\"account_admin_uuid\":\"3fa85f64-5717-4562-b3fc-2c963f66afa6\"}"
  router.post('/', async (req, res, next) => {
    log.info(`POST ${req.url} ${JSON.stringify(req.body)}`);

    const knownParams = [ 'account_uuid', 'account_admin_uuid' ];
    const unknownParamsErrors = validateKnownParams(knownParams, req.body);
    const validationResult = await req.getValidationResult();
    if (!validationResult.isEmpty() || unknownParamsErrors.length) {
      handleValidationFailure([ ...validationResult.array(), ...unknownParamsErrors ], res);
      return;
    }

    res.json({
      data: {
        uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        account_uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        account_admin_uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
    });
  });

  return router;
}
