// Utility to detect if we're running on Vercel
export const isVercel = () => {
  return process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined
}

