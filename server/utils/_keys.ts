export const configs = {
    type: import.meta.env.TYPE,
    project_id: import.meta.env.PROJECT_ID,
    private_key_id: import.meta.env.PRIVATE_KEY_ID,
    private_key: import.meta.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: import.meta.env.CLIENT_EMAIL,
    client_id: import.meta.env.CLIENT_ID,
    auth_uri: import.meta.env.AUTH_URI,
    token_uri: import.meta.env.TOKEN_URI,
    auth_provider_x509_cert_url: import.meta.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: import.meta.env.CLIENT_X509_CERT_URL,
    universe_domain: import.meta.env.UNIVERSE_DOMAIN
}



