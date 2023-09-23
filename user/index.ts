interface UserData{
    id?: number,
    email?: string,
    username?: string,
    error: boolean,
    message: string,
    token?: string
}

const UserTypes = {
    admin: "admin",
    user: "user"
}

export {UserData, UserTypes};