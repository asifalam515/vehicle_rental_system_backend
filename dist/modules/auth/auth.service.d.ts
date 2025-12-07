export declare const authService: {
    createUserToDB: (payload: Record<string, unknown>) => Promise<import("pg").QueryResult<any>>;
    loginUserToDB: (email: string, password: string) => Promise<{
        token: string;
        user: any;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map