import { requestClient } from '#/api/request';

export function getAdminItemList(params: any) {
  // Backend có Route: GET /api/admin/items
  return requestClient.get('/items', { params });
}
