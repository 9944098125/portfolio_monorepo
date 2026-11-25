export interface IContact {
	_id?: string;
	medium?: string;
	logo?: string;
	userId?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface IEducationalDetails {
	_id?: string;
	name_of_education?: string;
	start_year?: string;
	passout_year?: string;
	present?: boolean;
	userId?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface IProject {
	_id?: string;
	thumbnail?: string;
	name?: string;
	skills?: string[];
	description?: string;
	liveDemo?: string;
	githubLink?: string;
	userId?: string;
	createdAt?: string;
	updatedAt?: string;
}

export type SkillLevel = "Beginner" | "Intermediate" | "Expert";

export interface ISkill {
	_id?: string;
	name?: string;
	level?: SkillLevel;
	userId?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface ITheme {
	_id?: string;
	name?: string;
	primaryColor?: string;
	secondaryColor?: string;
	boldBg?: string;
	background?: string;
	userId?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface IUser {
	_id?: string;
	full_name?: string;
	image?: string;
	email?: string;
	countryCode?: string;
	phone?: string;
	password?: string;
	about?: string;
	city?: string;
	designation?: string;
	is_admin?: boolean;
	projects?: (string | IProject)[];
	skills?: (string | ISkill)[];
	contacts?: (string | IContact)[];
	educationalDetails?: (string | IEducationalDetails)[];
	selectedTheme?: ITheme;
	createdAt?: string;
	updatedAt?: string;
}
