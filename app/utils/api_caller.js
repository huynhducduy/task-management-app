import axios from "axios";
import * as authHelpers from "./auth";

const config = {
    timeout: 0,
};

function defaultHeaders() {
    const headers = {};

    headers["Content-Type"] = "application/json";

    const access_token = authHelpers.getAccessToken();
    if (access_token !== null && !authHelpers.tokenIsExpired)
        headers.Authorization = `Bearer ${access_token}`;

    return headers;
}

export async function request({
    to,
    method = "GET",
    data = {},
    params = {},
    headers = {},
    custom,
}) {
    try {
        Promise.all([
            authHelpers.tokenIsAlmostExpired(),
            authHelpers.getAccessToken(),
            authHelpers.getRefreshToken(),
        ]).then(
            async ([tokenIsAlmostExpired, getAccessToken, getRefreshToken]) => {
                if (tokenIsAlmostExpired || !getAccessToken) {
                    if (!getRefreshToken) await authHelpers.clearAuth();
                    // else
                    // refresh token right before request
                    // await refreshToken().then((data) => {
                    //     setAuth();
                    // }).catch( () => {
                    //     authHelpers.clearAuth();
                    // })
                }
            }
        );

        return axios({
            headers: { ...(await defaultHeaders()), ...headers },
            url: to,
            method,
            data,
            params,
            config,
            ...custom,
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export function Get({ to, data = {}, params = {}, headers = {} }) {
    return request({
        to,
        method: "GET",
        data,
        params,
        headers,
    });
}

export function Post({ to, data = {}, params = {}, headers = {} }) {
    return request({
        to,
        method: "POST",
        data,
        params,
        headers,
    });
}

export function Put({ to, data = {}, params = {}, headers = {} }) {
    return request({
        to,
        method: "PUT",
        data,
        params,
        headers,
    });
}

export function Patch({ to, data = {}, params = {}, headers = {} }) {
    return request({
        to,
        method: "PATCH",
        data,
        params,
        headers,
    });
}

export function Options({ to, data = {}, params = {}, headers = {} }) {
    return request({
        to,
        method: "OPTIONS",
        data,
        params,
        headers,
    });
}

export function Head({ to, data = {}, params = {}, headers = {} }) {
    return request({
        to,
        method: "HEAD",
        data,
        params,
        headers,
    });
}

export function Delete({ to, data = {}, params = {}, headers = {} }) {
    return request({
        to,
        method: "DELETE",
        data,
        params,
        headers,
    });
}
