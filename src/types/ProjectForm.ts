export type ProjectFormValues = {
  name: string;
  description: string;
}

export type ProjectFormProps = {
  defaultValues?: ProjectFormValues;
  formId: string;
  onSubmitForm: (values: ProjectFormValues) => void;
}