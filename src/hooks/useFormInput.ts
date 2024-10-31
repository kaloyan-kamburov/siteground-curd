/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const useFormInput = (initialValue: { [key: string]: any }) => {
  const [formValue, setFormValue] = useState(initialValue);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setFormValue(initialValue);
  };

  const setInitialValues = (values: { [key: string]: any }) => {
    setFormValue(values);
  };
  return {
    formValue,
    setInitialValues,
    onChange,
    resetForm,
  };
};
