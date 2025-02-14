import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validate = (schema: { body?: yup.ObjectSchema<any>; params?: yup.ObjectSchema<any>; query?: yup.ObjectSchema<any>; headers?: yup.ObjectSchema<any> }) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => { //  Retorno `void`
    try {
      if (schema.body) req.body = await schema.body.validate(req.body, { abortEarly: false, stripUnknown: true });
      if (schema.params) req.params = await schema.params.validate(req.params, { abortEarly: false, stripUnknown: true });
      if (schema.query) req.query = await schema.query.validate(req.query, { abortEarly: false, stripUnknown: true });
      if (schema.headers) req.headers = await schema.headers.validate(req.headers, { abortEarly: false, stripUnknown: true });

      return next(); // Apenas chama `next()`
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        res.status(400).json({ 
          errors: err.inner.map(error => ({
            field: error.path,
            message: error.message
          }))
        });
        return; //  Garante que a função termina aqui (evita retorno de `Response`)
      }

      res.status(500).json({ message: 'Erro interno no servidor.' });
      return; //  Evita erro de tipo
    }
  };
};

export default validate;
