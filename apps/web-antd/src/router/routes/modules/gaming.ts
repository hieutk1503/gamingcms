import type { RouteRecordRaw } from 'vue-router';

const BasicLayout = () => import('#/layouts/basic.vue');

const routes: RouteRecordRaw[] = [
  // --- 1. LUCKYBOX ---
  {
    path: '/luckybox',
    name: 'LuckyboxRoot',
    component: BasicLayout,
    meta: { title: 'Quản lý Luckybox', order: 1000 },
    children: [
      {
        path: 'index',
        name: 'LuckyboxManagement',
        component: () => import('#/views/luckybox/index.vue'),
        meta: { title: 'Cấu hình Luckybox', icon: 'lucide:gift' },
      },
    ],
  },

  // --- 2. BẢNG XẾP HẠNG ---
  {
    path: '/leaderboard',
    name: 'LeaderboardRoot',
    component: BasicLayout,
    meta: { title: 'Quản lý BXH', order: 1001 },
    children: [
      {
        path: 'index',
        name: 'LeaderboardManagement',
        component: () => import('#/views/leaderboard/index.vue'),
        meta: { title: 'Bảng Xếp Hạng', icon: 'lucide:trophy' },
      },
      {
        path: 'prize-config',
        name: 'LeaderboardPrizeConfig',
        component: () => import('#/views/leaderboard-prize/index.vue'),
        meta: { title: 'Cấu hình Quà Đua Top', icon: 'lucide:settings-2' },
      },
    ],
  },

  // --- 3. LỊCH SỬ ---
  {
    path: '/history-score',
    name: 'HistoryScore',
    component: BasicLayout,
    meta: { title: 'Lịch sử nạp điểm', order: 1002 },
    children: [
      {
        path: 'index',
        name: 'HistoryScoreIndex',
        component: () => import('#/views/history/score/index.vue'),
        meta: { title: 'Lịch sử nạp điểm', icon: 'lucide:history' },
      },
    ],
  },
  {
    path: '/history-reward',
    name: 'HistoryReward',
    component: BasicLayout,
    meta: { title: 'Lịch sử nhận quà', order: 1003 },
    children: [
      {
        path: 'index',
        name: 'HistoryRewardIndex',
        component: () => import('#/views/history/reward/index.vue'),
        meta: { title: 'Lịch sử nhận quà', icon: 'lucide:gift' },
      },
    ],
  },

  {
    path: '/items',
    name: 'ItemRoot', // Tên Route Cha (Đặt khác Route Con để không lỗi)
    component: BasicLayout,
    meta: {
      order: 1004, // Thứ tự hiển thị
    },
    children: [
      {
        path: 'index',
        name: 'ItemPage', // Tên Route Con (Chính là trang hiển thị)
        component: () => import('#/views/items/index.vue'),
        meta: {
          title: 'Quản lý Vật phẩm', // Tên hiện trên Menu
          icon: 'lucide:package',    // Icon hộp hàng
        },
      },
    ],
  },


  {
    path: '/inventory',
    name: 'InventoryRoot', // Tên Route Cha
    component: BasicLayout,
    meta: {
      order: 1005, // Thứ tự hiển thị
    },
    children: [
      {
        path: 'index',
        name: 'InventoryPage', // Tên Route Con
        component: () => import('#/views/inventory/index.vue'),
        meta: {
          title: 'Kho đồ Người chơi', // Tên hiện trên Menu
          icon: 'lucide:backpack',    // Icon cái balo
        },
      },
    ],
  },
];

export default routes;
