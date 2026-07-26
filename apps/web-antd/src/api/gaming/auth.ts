import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录 (Đăng nhập)
 * Old: /auth/login -> New: /cms/auth/login
 */
export async function loginApi(data: AuthApi.LoginParams) {
  // ✅ SỬA Ở ĐÂY
  return requestClient.post<AuthApi.LoginResult>('/cms/auth/login', data);
}

/**
 * 刷新accessToken (Refresh Token)
 * Old: /auth/refresh -> New: /cms/auth/refresh
 */
export async function refreshTokenApi() {
  // ✅ SỬA Ở ĐÂY
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/cms/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录 (Đăng xuất)
 * Old: /auth/logout -> New: /cms/auth/logout
 */
export async function logoutApi() {
  // ✅ SỬA Ở ĐÂY
  return baseRequestClient.post('/cms/auth/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码 (Lấy quyền/Roles)
 * Old: /auth/codes -> New: /cms/auth/codes
 */
export async function getAccessCodesApi() {
  // ✅ SỬA Ở ĐÂY
  return requestClient.get<string[]>('/cms/auth/codes');
}
