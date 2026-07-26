<template>
  <Page title="Quản lý danh sách vật phẩm">
    <div class="p-4 h-full">
      <Grid>
        <template #toolbar_buttons>
          <AButton type="primary" @click="handleCreate"> Thêm vật phẩm </AButton>
        </template>

        <template #status_col="{ row }">
          <Tag :color="row.status === 'ACTIVE' ? 'green' : 'orange'">
            {{ row.status === 'ACTIVE' ? 'Đang bán' : 'Ngừng bán' }}
          </Tag>
        </template>

        <template #action_col="{ row }">
          <div class="flex gap-2">
            <AButton type="link" size="small" @click="handleEdit(row)">Sửa</AButton>
            <Popconfirm title="Xóa vật phẩm này?" @confirm="handleDelete(row)">
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
import { getAdminItemList } from '#/api/gaming/item'; 
import { requestClient } from '#/api/request';

// 1. Định nghĩa cột (Đã thêm Mã vật phẩm, Loại, Ngày tạo)
const columns: VxeGridProps['columns'] = [
  { field: 'id', title: 'ID', width: 60 },
  
  // Hiển thị item_code cho chuyên nghiệp
  { field: 'item_code', title: 'Mã Code', width: 120 },

  { field: 'item_name', title: 'Tên vật phẩm', minWidth: 160 },

  // Lấy dữ liệu từ include: { category: true } của Prisma
  { 
    field: 'category', 
    title: 'Loại', 
    width: 120,
    formatter: ({ row }: any) => row.category?.category_name || 'Chưa phân loại'
  },

  { 
    field: 'price', 
    title: 'Giá', 
    width: 130,
    formatter: ({ cellValue }: any) => cellValue ? `${Number(cellValue).toLocaleString()} VND` : '0 VND' 
  },

  { 
    field: 'status', 
    title: 'Trạng thái', 
    width: 110,
    slots: { default: 'status_col' } 
  },

  // Hiển thị ngày tạo từ created_at
  { 
    field: 'created_at', 
    title: 'Ngày tạo', 
    width: 160,
    formatter: ({ cellValue }: any) => {
      return cellValue ? new Date(cellValue).toLocaleString('vi-VN') : '-';
    }
  },

  { 
    title: 'Thao tác', 
    width: 120, 
    fixed: 'right',
    slots: { default: 'action_col' } 
  },
];

// 2. Cấu hình Grid
const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    // Thêm tìm kiếm theo Tên và Mã Code như Backend đã viết
    schema: [
      {
        fieldName: 'itemName', // Khớp với req.query.itemName ở Backend
        label: 'Tên vật phẩm',
        component: 'Input',
        componentProps: { placeholder: 'Tìm tên...', allowClear: true },
      },
      {
        fieldName: 'itemCode', // Khớp với req.query.itemCode ở Backend
        label: 'Mã Code',
        component: 'Input',
        componentProps: { placeholder: 'Nhập mã...', allowClear: true },
      },
    ],
  },
  gridOptions: {
    columns,
    border: true,
    pagerConfig: { enabled: true }, 
    proxyConfig: {
      ajax: {
        query: async ({ page, form }: any) => {
          const res: any = await getAdminItemList({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...form,
          });

          // Prisma trả về items và total từ ServiceResponse.Success
          return {
            items: res?.items || [],
            total: res?.total || 0,
          };
        },
      },
    },
  },
});

// --- CÁC HÀM XỬ LÝ ---

function handleCreate() { 
  message.info('Tính năng Thêm vật phẩm đang phát triển'); 
}

async function handleEdit(row: any) {
  message.info(`Đang sửa: ${row.item_name} (${row.item_code})`);
}

async function handleDelete(row: any) {
  try {
    // Đảm bảo Backend có router.delete('/cms/items/:id', ...)
    await requestClient.delete(`/cms/items/${row.id}`);
    message.success('Xóa thành công');
    gridApi.reload();
  } catch (error) {
    message.error('Không thể xóa vật phẩm này');
  }
}
</script>
