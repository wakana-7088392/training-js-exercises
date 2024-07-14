export const isEmailAddress = (address?: string | null) => {
  if (!address || address.length > 254 || address.indexOf("@") > 64) {
    return false;
  }
  if (/^\.|\.\.|\.$|\.@|@\./.test(address)) {
    return false;
  }
  const pattern =
    /^[a-z0-9!#\$%&'\*\+\-/=\?\^_`\.\{\|\}~]+@[a-z0-9!#\$%&'\*\+\-/=\?\^_`\.\{\|\}~]+$/i;
  return pattern.test(address);
};
