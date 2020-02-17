import { Router } from 'express';
import { handleValidationFailure } from '../../errors';
import { validateKnownParams } from '../../validation/helpers';

export default function createRouter(log) {
  const router = new Router();

  // Get susbcriptions for users in Stripe
  router.get('/', async (req, res, next) => {
    log.info(`GET ${req.url}`);

    const knownParams = [ 'account_uuid' ];
    const unknownParamsErrors = validateKnownParams(knownParams, req.query);
    const validationResult = await req.getValidationResult();
    if (!validationResult.isEmpty() || unknownParamsErrors.length) {
      handleValidationFailure([ ...validationResult.array(), ...unknownParamsErrors ], res);
      return;
    }

    res.json({
      data: [
        {
          uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          cancel_at_period_end: true,
          current_period_start: '2020-02-15T01:27:39.264Z',
          current_period_end: '2020-02-15T01:27:39.264Z',
          cancel_at: '2020-02-15T01:27:39.264Z',
          canceled_at: '2020-02-15T01:27:39.264Z',
          start_date: '2020-02-15T01:27:39.264Z',
          ended_at: '2020-02-15T01:27:39.264Z',
          next_pending_invoice_item_invoice: '2020-02-15T01:27:39.264Z',
          status: 'incomplete',
          collection_method: 'charge_automatically',
          plan_uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        },
      ],
    });
  });

  // Creates a subsciption for an account
  // curl -X POST "http://localhost:4000/v1/subscriptions" -H "accept: application/json" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"plan_uuid\":\"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\"account_uuid\":\"3fa85f64-5717-4562-b3fc-2c963f66afa6\"}"
  router.post('/', async (req, res, next) => {
    log.info(`POST ${req.url} ${JSON.stringify(req.body)}`);

    const knownParams = [ 'plan_uuid', 'account_uuid' ];
    const unknownParamsErrors = validateKnownParams(knownParams, req.body);
    const validationResult = await req.getValidationResult();
    if (!validationResult.isEmpty() || unknownParamsErrors.length) {
      handleValidationFailure([ ...validationResult.array(), ...unknownParamsErrors ], res);
      return;
    }

    res.json({
      data: {
        uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        cancel_at_period_end: true,
        current_period_start: '2020-02-17T02:27:06.680Z',
        current_period_end: '2020-02-17T02:27:06.680Z',
        cancel_at: '2020-02-17T02:27:06.680Z',
        canceled_at: '2020-02-17T02:27:06.680Z',
        start_date: '2020-02-17T02:27:06.680Z',
        ended_at: '2020-02-17T02:27:06.680Z',
        next_pending_invoice_item_invoice: '2020-02-17T02:27:06.680Z',
        status: 'incomplete',
        collection_method: 'charge_automatically',
        plan_uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
    });
  });

  return router;
}
