export declare const userService: {
    getUsersFromDB: () => Promise<import("pg").QueryResult<any>>;
    updateUserInDB: (payload: Record<string, unknown>, userId: string) => Promise<import("pg").QueryResult<any>>;
    deleteUserFromDB: (userId: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=user.service.d.ts.map