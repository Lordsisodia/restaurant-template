export function track(event: string, props: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV === 'development') {
    console.debug('[analytics] track', event, props);
  }
  // TODO: implement analytics dispatch respecting consent.
}
