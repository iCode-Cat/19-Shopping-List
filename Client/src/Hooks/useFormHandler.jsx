import { useState } from 'react';

export function useFormFields(event) {
  const [fields, setValues] = useState(event);

  return [
    fields,
    (field, event) => {
      setValues({
        ...fields,
        [field]: event.target.value,
      });
    },
  ];
}
