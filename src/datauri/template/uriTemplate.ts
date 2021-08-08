import DataURIParser from '../parser';

export const uriParser = ({
  mimetype = 'application/octet-stream',
  base64 = ''
}: Pick<DataURIParser, 'mimetype' | 'base64'>): string => `data:${mimetype};base64,${base64}`;
