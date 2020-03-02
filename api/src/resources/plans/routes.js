import { Router } from 'express';
import { handleValidationFailure } from '../../errors';
import { validateKnownParams } from '../../validation/helpers';

export default function createRouter(log) {
  const router = new Router();

  router.get('/', async (req, res, next) => {
    log.info(`GET ${req.url} ${JSON.stringify(req.body)}`);

    const knownParams = [ 'currency' ];
    const unknownParamsErrors = validateKnownParams(knownParams, req.body);
    const validationResult = await req.getValidationResult();
    if (!validationResult.isEmpty() || unknownParamsErrors.length) {
      handleValidationFailure([ ...validationResult.array(), ...unknownParamsErrors ], res);
      return;
    }

    res.json({
      data: [
        {
          uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          amount: 10,
          currency: 'usd',
          interval: 'day',
          nickname: 'WeWork Now Unlimited',
          is_active: true,
        },
      ],
    });
  });

  return router;
}
