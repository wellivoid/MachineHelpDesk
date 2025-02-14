import { Request, Response, NextFunction } from 'express';
import { AnyObject, ObjectSchema, ValidationError } from 'yup';

const validate = (schema: ObjectSchema<AnyObject>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.validate(req.body, { abortEarly: false }); // 🔥 Não para no primeiro erro
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        // 🔥 Mapeia todos os erros e retorna um array
        const errors = error.inner.map(err => ({
          field: err.path,
          message: err.message
        }));

        res.status(400).json({ errors });
        return;
      }

      res.status(500).json({ message: 'Erro inesperado na validação' });
    }
  };
};

export default validate;
