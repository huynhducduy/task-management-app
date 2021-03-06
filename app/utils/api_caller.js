import axios from 'axios';

import * as authHelpers from './auth';

const config = {
  timeout: 0,
};

async function defaultHeaders() {
  try {
    const headers = {};

    headers['Content-Type'] = 'application/json';

    const accessToken = await authHelpers.getAccessToken();

    if (accessToken !== null && !(await authHelpers.tokenIsExpired()))
      headers.Authorization = `Bearer ${accessToken}`;

    return headers;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function request({
  to,
  method = 'GET',
  data,
  params,
  headers,
  setLoading = function() {},
  ...custom
}) {
  setLoading(true);
  try {
    Promise.all([
      authHelpers.tokenIsAlmostExpired(),
      authHelpers.getAccessToken(),
      authHelpers.getRefreshToken(),
    ]).then(async ([tokenIsAlmostExpired, getAccessToken, getRefreshToken]) => {
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
    });

    return axios({
      headers: { ...(await defaultHeaders()), ...headers },
      url: to,
      method,
      data,
      params,
      config,
      ...custom,
    }).finally(() => setTimeout(() => setLoading(false), 300));
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export function Get({ to, data, params, headers, setLoading, ...custom }) {
  return request({
    to,
    method: 'GET',
    data,
    params,
    headers,
    setLoading,
    ...custom,
  });
}

export function Post({ to, data, params, headers, setLoading, ...custom }) {
  return request({
    to,
    method: 'POST',
    data,
    params,
    headers,
    setLoading,
    ...custom,
  });
}

export function Put({ to, data, params, headers, setLoading, ...custom }) {
  return request({
    to,
    method: 'PUT',
    data,
    params,
    headers,
    setLoading,
    ...custom,
  });
}

export function Patch({ to, data, params, headers, setLoading, ...custom }) {
  return request({
    to,
    method: 'PATCH',
    data,
    params,
    headers,
    setLoading,
    ...custom,
  });
}

export function Options({ to, data, params, headers, setLoading, ...custom }) {
  return request({
    to,
    method: 'OPTIONS',
    data,
    params,
    headers,
    setLoading,
    ...custom,
  });
}

export function Head({ to, data, params, headers, setLoading, ...custom }) {
  return request({
    to,
    method: 'HEAD',
    data,
    params,
    headers,
    setLoading,
    ...custom,
  });
}

export function Delete({ to, data, params, headers, setLoading, ...custom }) {
  return request({
    to,
    method: 'DELETE',
    data,
    params,
    headers,
    setLoading,
    ...custom,
  });
}
