import dotenv from "dotenv";

dotenv.config();

const cache: Record<string, unknown> = {};

export default function accessEnv<T = any>(key: string, fallback?: T): T {
	if (key in cache) return <T>cache[key];

	if (key in process.env) return <T>(<unknown>process.env[key]);

	if (fallback) return fallback;

	throw new Error(`key ${key} not present in process.env`);
}
