export interface User {
    id: string;
    email: string;
    username: string;
    [propsName: string]: any
}

export interface UserState {
	currentUser: User | null,
	loaded: boolean
}

export interface SigninForm {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: "a9cb7770-588e-4ab5-937e-7bbd155cb791";
    confirmPassword?: string;
    language?: string;
}

export interface LoginForm {
    email: string;
    password: string;
}
