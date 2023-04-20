import { ChangeEventHandler } from 'react';

export interface IChangeProductFunctions {
  handleSubmit: () => void,
  resetForm: () => void,
  setFieldValue: (field: string, value: string[] | string) => void,
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  handleChipRemove: (
    value: string,
    currentValue: string[],
    valueName: string
  ) => void,
  handleChipAdd: (
    value: string,
    currentValue: string[],
    valueName: string,
    valueOnAddName: string
  ) => void,
}