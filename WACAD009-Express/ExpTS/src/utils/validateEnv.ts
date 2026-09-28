export function validateEnv(): void {
  const requiredEnvVars = ['PORT', 'LOG_DIR'];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Variáveis de ambiente obrigatórias não definidas: ${missingEnvVars.join(', ')}`
    );
  }

  const port = Number(process.env.PORT);

  if (Number.isNaN(port) || port <= 0 || port > 65535) {
    throw new Error(
      'A variável de ambiente PORT deve ser um número entre 1 e 65535.'
    );
  }
}
