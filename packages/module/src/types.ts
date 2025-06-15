export type DataURIInput = string | Buffer;
export type DataURIMetaSchema = {
	fileName?: string;
	mimetype?: string;
	content?: string;
	base64?: string;
	buffer?: Buffer;
};
export type DataURICallback = (
	err?: Error,
	content?: string,
	meta?: DataURIMetaSchema,
) => void;
