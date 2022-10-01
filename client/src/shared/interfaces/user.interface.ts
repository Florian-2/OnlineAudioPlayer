export interface User {
    _id: string;
    email: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
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
    confirmPassword?: string;
}

export interface LoginForm {
    email: string;
    password: string;
}

export interface EditUser {
    username: string;
    email: string;
}