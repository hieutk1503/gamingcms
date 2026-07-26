import { requestClient } from '#/api/request';

export function getAdminInventoryList(params: any) {
  // SAI: return requestClient.get('/cms/inventories', params);
  
  // ĐÚNG: Phải bọc trong { params } thì nó mới gắn lên URL được
  return requestClient.get('/cms/inventories', { params }); 
}
