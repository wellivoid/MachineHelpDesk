import { Request, Response, NextFunction } from 'express';
import { AnyObject, ObjectSchema, ValidationError } from 'yup';

type SchemaType = ObjectSchema<AnyObject> | { body?: ObjectSchema<AnyObject>; params?: ObjectSchema<AnyObject>; query?: ObjectSchema<AnyObject>; headers?: ObjectSchema<AnyObject>; };

const validate = (schema: SchemaType) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors: { field: string | undefined; message: string }[] = [];

      // Se for um schema único, assume que é o `body`
      const schemas = (schema instanceof ObjectSchema) ? { body: schema } : schema;

      // Validação dinâmica
      for (const key of Object.keys(schemas)) {
        const schemaKey = key as keyof typeof schemas;
        if (schemas[schemaKey]) {
          await schemas[schemaKey]!.validate(req[schemaKey], { abortEarly: false }).catch((err: ValidationError) => {
            errors.push(...err.inner.map(e => ({ field: `${schemaKey}.${e.path}`, message: e.message })));
          });
        }
      }

      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(500).json({ message: 'Erro inesperado na validação' });
    }
  };
};

export default validate;

