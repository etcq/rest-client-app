export default function convertFormData(formData: FormData) {
  const key = formData.get('key');
  const value = formData.get('value');
  if (typeof key === 'string' && typeof value === 'string' && key.length > 0 && value.length > 0) {
    return [key, value];
  } else {
    throw new Error('Invalid FormData');
  }
}
