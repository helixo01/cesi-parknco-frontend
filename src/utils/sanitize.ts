export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 255);
};

export const sanitizeEmail = (email: string): string => {
  return email
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, '');
};

export const sanitizePhone = (phone: string): string => {
  return phone
    .trim()
    .replace(/[^0-9+]/g, '')
    .slice(0, 15);
};
