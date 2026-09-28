interface Technology {
  name: string;
  type: string;
  poweredByNodejs: boolean;
}

interface HandlebarsOptions {
  fn: (technology: Technology) => string;
}

export function listNodeTechnologies(
  technologies: Technology[],
  options: HandlebarsOptions
): string {
  return technologies
    .filter((technology) => technology.poweredByNodejs)
    .map((technology) => options.fn(technology))
    .join('');
}
