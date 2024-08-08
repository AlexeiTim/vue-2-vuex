export function defineErrors(error) {
  let fieldErrors = {};
  let errorMessage = "";
  const errorData = error?.response?.data?.data;
  if (errorData?.non_field_errors)
    errorMessage = errorData?.non_field_errors?.join(", ");
  else fieldErrors = errorData;

  return {
    errorMessage,
    fieldErrors,
  };
}
