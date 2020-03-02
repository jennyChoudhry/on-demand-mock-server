import { Router } from 'express';
import { OK } from 'http-status-codes';
import { handleValidationFailure } from '../../errors';
import { validateKnownParams } from '../../validation/helpers';

export default function createRouter(log) {
  const router = new Router();

  // Starts the process to add a payment profile to a user's account
  // curl -X POST "http://localhost:4000/v1/payment_profiles/on_board" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"set_as_default\":true,\"account_uuid\":\"3fa85f64-5717-4562-b3fc-2c963f66afa6\"}"
  router.post('/on_board', async (req, res, next) => {
    log.info(`POST ${req.url} ${JSON.stringify(req.body)}`);

    const knownParams = [ 'set_as_default', 'account_uuid' ];
    const unknownParamsErrors = validateKnownParams(knownParams, req.body);
    const validationResult = await req.getValidationResult();
    if (!validationResult.isEmpty() || unknownParamsErrors.length) {
      handleValidationFailure([ ...validationResult.array(), ...unknownParamsErrors ], res);
      return;
    }

    res.json({
      data: {
        uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        client_secret: 'seti_123456789',
        publishable_key: 'pk_test_asiPkkj3Elkd9ansdloEk9aOkEI8aklmc3',
      },
    });
  });

  // Get an account's payment profiles
  router.get('/', async (req, res, next) => {
    log.info(`GET ${req.url} ${JSON.stringify(req.body)}`);

    const knownParams = [ 'account_uuid' ];
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
          last_four: '1234',
          description: 'Chase Sapphire',
          type: 'card',
          brand: 'visa',
          is_valid: true,
          is_default: false,
          account_uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        },
      ],
    });
  });

  // Get a single payment profile
  router.get('/:payment_profile_uuid', async (req, res, next) => {
    log.info(`GET ${req.url}`);

    res.json({
      data: {
        uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        last_four: '1234',
        description: 'Chase Sapphire',
        type: 'card',
        brand: 'visa',
        is_valid: true,
        is_default: false,
        account_uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
    });
  });

  // Detatches a payment profile from a user's account
  // curl -X DELETE "http://localhost:4000/v1/payment_profiles/3fa85f64-5717-4562-b3fc-2c963f66afa6" -H "accept: */*"
  router.delete('/:payment_profile_uuid', async (req, res, next) => {
    log.info(`DELETE ${req.url}`);

    res.sendStatus(OK);
  });

  return router;
}
