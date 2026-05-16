const rateLimit = (options: { interval: number; uniqueTokenPerInterval: number }) => {
  const tokenCache = new Map<string, number[]>();

  return {
    check: (limit: number, token: string): Promise<void> => {
      const now = Date.now();
      const windowStart = now - options.interval;
      const tokenCount = tokenCache.get(token) || [];
      const requestsInWindow = tokenCount.filter(t => t > windowStart);

      if (requestsInWindow.length >= limit) {
        return Promise.reject(new Error('Rate limit exceeded'));
      }

      requestsInWindow.push(now);
      tokenCache.set(token, requestsInWindow);

      // Cleanup old entries
      if (tokenCache.size > options.uniqueTokenPerInterval) {
        const oldest = Array.from(tokenCache.entries()).sort((a, b) => a[1][0] - b[1][0]);
        tokenCache.delete(oldest[0][0]);
      }

      return Promise.resolve();
    }
  };
};

export default rateLimit;
export const limiter = rateLimit({ interval: 60000, uniqueTokenPerInterval: 500 });
