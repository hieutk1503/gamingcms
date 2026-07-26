<template>
  <Page title="Quản lý Kho đồ Người chơi">
    <div class="p-4 h-full">
      <Grid>
        <template #status_col="{ row }">
          <Tag :color="row.status === 'EQUIPPED' ? 'green' : 'blue'">
            {{ row.status === 'EQUIPPED' ? 'Đang trang bị' : 'Trong kho' }}
          </Tag>
        </template>

        <template #action_col="{ row }">
          <div class="flex gap-2">
            <AButton type="link" size="small" @click="handleEdit(row)">Sửa</AButton>
            
            <Popconfirm 
              title="Xóa vật phẩm này khỏi kho?" 
              @confirm="handleDelete(row)"
              ok-text="Xóa"
              cancel-text="Hủy"
            >
              <AButton type="link" size="small" danger>Xóa</AButton>
            </Popconfirm>
          </div>
        </template>
      </Grid>
    </div>
  </Page>
</template>

<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { Button as AButton, Tag, Popconfirm, message } from 'ant-design-vue';
import { useVbenVxeGrid, type VxeGridProps } from '#/adapter/vxe-table';
import { requestClient } from '#/api/request';
import { getAdminInventoryList } from '#/api/gaming/inventory'; 

const columns: VxeGridProps['columns'] = [
  { field: 'id', title: 'ID', width: 80 },
  { field: 'user_id', title: 'User ID', minWidth: 120 },
  { field: 'item_name', title: 'Tên vật phẩm', minWidth: 150 },
  { field: 'quantity', title: 'Số lượng', width: 100 },
  { 
    field: 'price', 
    title: 'Giá trị', 
    width: 130,
    formatter: ({ cellValue }: any) => cellValue ? `${Number(cellValue).toLocaleString()} VND` : '0 VND' 
  },
  { field: 'status', title: 'Trạng thái', width: 130, slots: { default: 'status_col' } },
  { 
    field: 'created_at', 
    title: 'Ngày nhận', 
    width: 160,
    formatter: ({ cellValue }: any) => cellValue ? new Date(cellValue).toLocaleString('vi-VN') : '-'
  },
  { title: 'Thao tác', width: 120, fixed: 'right', slots: { default: 'action_col' } },
];

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: [
      {
        fieldName: 'userId',
        label: 'ID Người chơi',
        component: 'Input',
        componentProps: { placeholder: 'Nhập ID...', allowClear: true },
      },
      {
        fieldName: 'itemName',
        label: 'Tên vật phẩm',
        component: 'Input',
        componentProps: { placeholder: 'Nhập tên...', allowClear: true },
      },
    ],
  },
  gridOptions: {
    columns,
    border: true,
    pagerConfig: { enabled: true, pageSize: 20 }, 
    proxyConfig: {
  ajax: {
    query: async ({ page }: any) => {
      
      // ✅ THÊM await ở đây để lấy dữ liệu thực tế thay vì lấy Promise
      const formValues = await gridApi.formApi.getValues();
      
      console.log('>>>> [FRONTEND DEBUG] Form Values đã lấy được:', formValues);

      const res: any = await getAdminInventoryList({
        page: page.currentPage,
        pageSize: page.pageSize,
        // Giờ thì formValues đã là object thật, lấy userId thoải mái
        userId: formValues?.userId || undefined,
        itemName: formValues?.itemName || undefined,
      });

      return {
        items: res?.items || [],
        total: res?.total || 0,
      };
    },
  },
},
  },
});

// --- LOGIC XỬ LÝ ---

async function handleDelete(row: any) {
  try {
    await requestClient.delete('/cms/inventories', { data: { id: row.id } });
    message.success('Xóa thành công');
    gridApi.reload();
  } catch (error: any) {
    message.error('Lỗi khi xóa');
  }
}

async function handleEdit(row: any) {
  const newQty = window.prompt(`Nhập số lượng cho [${row.item_name}]:`, row.quantity);
  if (newQty !== null) {
    try {
      await requestClient.put('/cms/inventories', { id: row.id, quantity: Number(newQty) });
      message.success('Cập nhật thành công');
      gridApi.reload(); 
    } catch (error: any) {
      message.error('Lỗi cập nhật');
    }
  }
}
</script>
