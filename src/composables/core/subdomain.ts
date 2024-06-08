
export const useSubdomain = () => useState<string>('subdomain', () => null as any)
export const useSubdomainSite = () => useState<Record<string, any>>('subdomain-profile', () => null as any)
