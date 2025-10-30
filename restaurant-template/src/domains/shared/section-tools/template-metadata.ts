export interface TemplateMetadata {
  name: string;
  description: string;
  screenshot?: string;
  recommendedUse?: string[];
  notes?: string[];
}

export function defineTemplateMetadata(metadata: TemplateMetadata): TemplateMetadata {
  if (!metadata.name?.trim()) {
    throw new Error('Template metadata is missing a name.');
  }

  if (!metadata.description?.trim()) {
    throw new Error(`Template metadata for "${metadata.name}" is missing a description.`);
  }

  return metadata;
}
