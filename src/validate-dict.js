export const dictionary = {
  en: {
    messages: {
      required: () => 'Required field',
      email: () => 'Invalid email',
      confirmed: () => 'Not match',
      min: (name, param) => `Minimum ${param} characters`,
      alpha_spaces: () => 'English only',
      numeric: () => 'Digits only',
      digits: (name, param) => `Must be ${param} digits`
    }
  }
}
