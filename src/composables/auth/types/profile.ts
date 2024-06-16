export type ProfileType = {
	id: string | null;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	verified_level: number;
	profile_level: number;
	tasker_rating: number | boolean;
	runner_rating: number | boolean;
	referrer: string;
	photo_url?: string;
	is_admin?: boolean;
	bio?: string;
	skills?: string[];
	location?: {
		name: string;
		lat: number;
		lng: number;
	};
	links?: {
		whatsapp?: string;
		facebook?: string;
		instagram?: string;
		twitter?: string;
	};
	geohash?: string;
	created_at: string;
	updated_at: string;
};
