const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));
const ROLES = {
  MANAGER: 'Quản lý',
  STAFF: 'Nhân viên',
  CUSTOMER: 'Khách hàng',
};
const normalizeRole = (role) => {
  if (role === 'admin') return ROLES.MANAGER;
  if (role === 'staff') return ROLES.STAFF;
  if (role === ROLES.MANAGER || role === ROLES.STAFF || role === ROLES.CUSTOMER) return role;
  return ROLES.STAFF;
};

const db = {
  products: [
    { id: 'p1', name: 'Combo Snack', price: 120000 },
    { id: 'p2', name: 'Nước ngọt', price: 25000 },
  ],
  users: [
    {
      id: 'u1',
      username: 'admin',
      name: 'Nguyễn Hoàng Nam',
      phone: '0987 654 321',
      role: ROLES.MANAGER,
      password: '123456',
    },
    {
      id: 'u2',
      username: 'tuan',
      name: 'Lê Minh Tuấn',
      phone: '0909 111 222',
      role: ROLES.STAFF,
      password: '123456',
    },
    {
      id: 'u3',
      username: 'baotran',
      name: 'Bảo Trân',
      phone: '0988 666 777',
      role: ROLES.CUSTOMER,
      points: 2500,
      password: '123456',
    },
  ],
  posts: [
    { id: 'post1', title: 'Khuyến mãi cuối tuần' },
    { id: 'post2', title: 'Mở thêm phòng mới' },
  ],
  rooms: [
    { id: 'r1', code: 'P101', name: 'Phòng 101', type: 'VIP', status: 'Đang hoạt động' },
    { id: 'r2', code: 'P102', name: 'Phòng 102', type: 'Thường', status: 'Trống' },
    { id: 'r3', code: 'P201', name: 'Phòng 201', type: 'VIP', status: 'Trống' },
  ],
  history: [
    {
      id: 'MB9012',
      roomName: 'Phòng 402',
      roomType: 'VIP',
      customerName: 'Trần Văn A',
      phone: '0901xxx234',
      date: '15/04/2026',
      time: '19:00',
      duration: '2 Giờ',
      deposit: '300.000đ',
      status: 'pending',
      isUpcoming: true,
      isArrived: null,
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    },
    {
      id: 'MB9011',
      roomName: 'Phòng 101',
      roomType: 'Thường',
      customerName: 'Lê Thị B',
      phone: '0912xxx567',
      date: '14/04/2026',
      time: '20:00',
      duration: '3 Giờ',
      deposit: '150.000đ',
      status: 'completed',
      isUpcoming: false,
      isArrived: true,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    },
    {
      id: 'MB9010',
      roomName: 'Phòng 305',
      roomType: 'VIP',
      customerName: 'Phạm Minh C',
      phone: '0988xxx999',
      date: '13/04/2026',
      time: '18:00',
      duration: '2 Giờ',
      deposit: '250.000đ',
      status: 'cancelled',
      isUpcoming: false,
      isArrived: false,
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
    },
  ],
  dashboard: {
    todayRevenue: '12.550.000đ',
    occupiedRooms: 18,
    totalRooms: 25,
    lowStock: [
      { id: 's1', name: 'Bia Tiger', remain: 6 },
      { id: 's2', name: 'Khăn lạnh', remain: 12 },
    ],
    topCustomers: [
      { id: 'c1', name: 'Nguyễn Văn A', spend: '8.400.000đ' },
      { id: 'c2', name: 'Trần Thị B', spend: '7.900.000đ' },
    ],
    recentActivities: [
      {
        id: 'a1',
        room: 'P402',
        type: 'VIP',
        date: '2026-05-02',
        start: '19:00',
        duration: '2h',
        status: 'Đang thuê',
      },
      {
        id: 'a2',
        room: 'P101',
        type: 'Thường',
        date: '2026-05-02',
        start: '20:30',
        duration: '3h',
        status: 'Hoàn tất',
      },
    ],
  },
  serviceRequests: [
    {
      id: 'sr1',
      room: 'P402',
      item: 'Bia Heineken',
      category: 'Đồ uống',
      qty: 6,
      requestTime: '21:15',
      status: 'Chờ xử lý',
    },
    {
      id: 'sr2',
      room: 'P402',
      item: 'Trái cây thập cẩm',
      category: 'Món ăn',
      qty: 1,
      requestTime: '21:20',
      status: 'Chờ xử lý',
    },
    {
      id: 'sr3',
      room: 'P305',
      item: 'Nước suối Aquafina',
      category: 'Đồ uống',
      qty: 3,
      requestTime: '21:45',
      status: 'Đã giao',
    },
  ],
  profile: {
    id: 'u1',
    name: 'Nguyễn Hoàng Nam',
    phone: '0987 654 321',
    points: 12400,
    avatar: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=300',
  },
  serviceCatalog: [
    {
      id: 'svc1',
      code: 'DV001',
      type: 'drink',
      name: 'Bia Tiger',
      price: 25000,
      unit: 'Lon',
      stock: 84,
      img: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=500',
    },
    {
      id: 'svc2',
      code: 'DV002',
      type: 'drink',
      name: 'Nước suối Aquafina',
      price: 12000,
      unit: 'Chai',
      stock: 140,
      img: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?q=80&w=500',
    },
    {
      id: 'svc3',
      code: 'DV003',
      type: 'food',
      name: 'Trái cây tổng hợp',
      price: 150000,
      unit: 'Phần',
      stock: 8,
      img: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=500',
    },
  ],
  priceRules: [
    {
      id: 'pr1',
      code: 'BG001',
      slotName: 'Sáng',
      fromHour: 8,
      toHour: 12,
      dayType: 'Ngày thường',
      roomType: 'VIP',
      price: 150000,
    },
    {
      id: 'pr2',
      code: 'BG002',
      slotName: 'Chiều',
      fromHour: 12,
      toHour: 18,
      dayType: 'Ngày thường',
      roomType: 'VIP',
      price: 180000,
    },
    {
      id: 'pr3',
      code: 'BG003',
      slotName: 'Tối',
      fromHour: 18,
      toHour: 23,
      dayType: 'Cuối tuần',
      roomType: 'VIP',
      price: 250000,
    },
  ],
  roomTypes: [
    {
      id: 'rt1',
      code: 'LP001',
      name: 'VIP',
      capacity: 15,
      deposit: 200000,
      description: 'Phòng VIP với dàn âm thanh 7.1, đèn laser theo nhạc, không gian riêng tư.',
    },
    {
      id: 'rt2',
      code: 'LP002',
      name: 'Thường',
      capacity: 8,
      deposit: 100000,
      description: 'Phòng hát tiêu chuẩn, sạch sẽ, âm thanh trung thực, phù hợp nhóm bạn.',
    },
  ],
  maintenanceReports: [
    {
      id: 'bh1',
      room: 'P101',
      content: 'Micro bên trái không lên tiếng dù đã thay pin mới.',
      requestTime: '2026-05-03T14:20:00',
      status: 'Chờ tiếp nhận',
    },
    {
      id: 'bh2',
      room: 'P302',
      content: 'Loa sub bị rè khi mở âm lượng lớn, cần kiểm tra dây cáp.',
      requestTime: '2026-05-03T14:45:00',
      status: 'Đang xử lý',
    },
  ],
  currentRoomSession: {
    roomCode: 'P402',
    roomType: 'VIP',
    customerName: 'Nguyễn Văn A',
    startedAt: '2026-05-04T18:45:00',
    roomPricePerHour: 110000,
    orderedServices: [
      { id: 'os1', name: 'Bia Heineken (Lon)', qty: 6, time: '20:15', status: 'Đã giao' },
    ],
  },
  supportHistory: [
    {
      id: 'sp1',
      time: '14:20',
      content: 'Lỗi micro phòng 402',
      status: 'Đã xử lý',
      statusColor: 'bg-emerald-500/20 text-emerald-400',
    },
    {
      id: 'sp2',
      time: '14:45',
      content: 'Cần thêm khăn giấy',
      status: 'Đang chờ',
      statusColor: 'bg-amber-500/20 text-amber-400',
    },
  ],
  currentSessions: [
    {
      id: 'cs1',
      roomCode: 'P402',
      roomType: 'VIP',
      customerName: 'Nguyễn Quốc Đạt',
      phone: '0905123456',
      checkinTime: '19:00',
      durationHours: 2.5,
      hourlyRate: 150000,
      services: [
        { id: 'sv1', name: 'Bia Tiger', qty: 6, price: 25000 },
        { id: 'sv2', name: 'Trái cây đĩa lớn', qty: 1, price: 150000 },
        { id: 'sv3', name: 'Snack Oishi', qty: 3, price: 15000 },
      ],
    },
  ],
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const vnd = (n) => `${Number(n).toLocaleString('vi-VN')}đ`;

export async function getProducts() {
  await delay();
  return clone(db.products);
}
export async function getUsers() {
  await delay();
  return clone(
    db.users.map(({ password: _password, ...u }) => ({
      ...u,
      role: normalizeRole(u.role),
      points: Number(u.points || 0),
    }))
  );
}
export async function getPosts() {
  await delay();
  return clone(db.posts);
}
export async function getRooms() {
  await delay();
  return clone(
    db.rooms.map((r, i) => ({
      id: r.code.replace('P', ''),
      loai: r.type,
      sucChua: r.type === 'VIP' ? 12 : 8,
      trangThai: r.status === 'Đang hoạt động' ? 'Đang bận' : 'Trống',
      gia: r.type === 'VIP' ? { n: '150', c: '200', l: '300' } : { n: '100', c: '120', l: '180' },
      img:
        i % 2 === 0
          ? 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400'
          : 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    }))
  );
}

export async function login(payload) {
  await delay(220);
  const username = (payload?.username || '').trim().toLowerCase();
  const password = payload?.password || '';
  const user = db.users.find(
    (u) =>
      (u.username.toLowerCase() === username || u.phone === username) && u.password === password
  );
  if (!user) throw new Error('Tài khoản hoặc mật khẩu không chính xác!');
  const { password: _password, ...safeUser } = user;
  return { token: `mock-token-${user.id}`, user: safeUser };
}
export async function registerUser(payload) {
  await delay(220);
  const username = (payload?.username || '').trim();
  const phone = (payload?.phone || '').trim();
  const password = payload?.password || '';
  const name = (payload?.name || '').trim();
  if (!username || !phone || !password || !name) throw new Error('Vui lòng nhập đầy đủ thông tin.');
  if (db.users.some((u) => u.username.toLowerCase() === username.toLowerCase()))
    throw new Error('Tên đăng nhập đã tồn tại.');
  if (db.users.some((u) => u.phone === phone)) throw new Error('Số điện thoại đã tồn tại.');
  const newUser = {
    id: `u${db.users.length + 1}`,
    username,
    phone,
    name,
    role: ROLES.CUSTOMER,
    points: 0,
    password,
  };
  db.users.push(newUser);
  const { password: _password, ...safeUser } = newUser;
  return clone(safeUser);
}

export async function getDashboardData() {
  await delay();
  return clone(db.dashboard);
}
export async function getBookingHistory() {
  await delay();
  return clone(db.history);
}
export async function cancelBooking(id) {
  await delay();
  const row = db.history.find((x) => x.id === id);
  if (!row) throw new Error('Booking not found');
  row.status = 'cancelled';
  row.isArrived = false;
  row.isUpcoming = false;
  return clone(row);
}

export async function getManagedRooms() {
  await delay();
  return clone(db.rooms);
}
export async function createRoom(data) {
  await delay();
  const room = { id: crypto.randomUUID(), ...data };
  db.rooms.push(room);
  return clone(room);
}
export async function updateRoom(id, data) {
  await delay();
  const index = db.rooms.findIndex((r) => r.id === id);
  if (index < 0) throw new Error('Room not found');
  db.rooms[index] = { ...db.rooms[index], ...data };
  return clone(db.rooms[index]);
}
export async function deleteRoom(id) {
  await delay();
  const index = db.rooms.findIndex((r) => r.id === id);
  if (index < 0) throw new Error('Room not found');
  const [deleted] = db.rooms.splice(index, 1);
  return clone(deleted);
}

export async function getServiceRequests() {
  await delay();
  return clone(db.serviceRequests);
}
export async function updateServiceRequestStatus(id, status) {
  await delay();
  const row = db.serviceRequests.find((r) => r.id === id);
  if (!row) throw new Error('Request not found');
  row.status = status;
  return clone(row);
}
export async function getMaintenanceReports() {
  await delay();
  return clone(db.maintenanceReports);
}
export async function updateMaintenanceReportStatus(id, status) {
  await delay();
  const row = db.maintenanceReports.find((r) => r.id === id);
  if (!row) throw new Error('Report not found');
  row.status = status;
  return clone(row);
}

export async function getProfile() {
  await delay();
  return clone(db.profile);
}
export async function updateProfile(data) {
  await delay();
  db.profile = { ...db.profile, ...data };
  return clone(db.profile);
}

export async function getServiceCatalog() {
  await delay();
  return clone(db.serviceCatalog);
}
export async function createService(data) {
  await delay();
  const nextNo = db.serviceCatalog.length + 1;
  const item = {
    id: crypto.randomUUID(),
    code: data?.code || `DV${String(nextNo).padStart(3, '0')}`,
    ...data,
  };
  db.serviceCatalog.push(item);
  return clone(item);
}
export async function updateService(id, data) {
  await delay();
  const i = db.serviceCatalog.findIndex((x) => x.id === id);
  if (i < 0) throw new Error('Service not found');
  db.serviceCatalog[i] = { ...db.serviceCatalog[i], ...data };
  return clone(db.serviceCatalog[i]);
}
export async function deleteService(id) {
  await delay();
  const i = db.serviceCatalog.findIndex((x) => x.id === id);
  if (i < 0) throw new Error('Service not found');
  const [deleted] = db.serviceCatalog.splice(i, 1);
  return clone(deleted);
}

export async function getPriceRules() {
  await delay();
  return clone(db.priceRules);
}
export async function createPriceRule(data) {
  await delay();
  const nextNo = db.priceRules.length + 1;
  const item = { id: crypto.randomUUID(), code: `BG${String(nextNo).padStart(3, '0')}`, ...data };
  db.priceRules.push(item);
  return clone(item);
}
export async function updatePriceRule(id, data) {
  await delay();
  const i = db.priceRules.findIndex((x) => x.id === id);
  if (i < 0) throw new Error('Price rule not found');
  db.priceRules[i] = { ...db.priceRules[i], ...data };
  return clone(db.priceRules[i]);
}
export async function getRoomTypes() {
  await delay();
  return clone(db.roomTypes);
}
export async function createRoomType(data) {
  await delay();
  const nextNo = db.roomTypes.length + 1;
  const item = { id: crypto.randomUUID(), code: `LP${String(nextNo).padStart(3, '0')}`, ...data };
  db.roomTypes.push(item);
  return clone(item);
}
export async function updateRoomType(id, data) {
  await delay();
  const i = db.roomTypes.findIndex((x) => x.id === id);
  if (i < 0) throw new Error('Room type not found');
  db.roomTypes[i] = { ...db.roomTypes[i], ...data };
  return clone(db.roomTypes[i]);
}
export async function deleteRoomType(id) {
  await delay();
  const i = db.roomTypes.findIndex((x) => x.id === id);
  if (i < 0) throw new Error('Room type not found');
  const [deleted] = db.roomTypes.splice(i, 1);
  return clone(deleted);
}

export async function getCurrentRoomSession() {
  await delay();
  return clone(db.currentRoomSession);
}
export async function placeRoomServiceOrder(items) {
  await delay();
  const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  items.forEach((item) => {
    db.currentRoomSession.orderedServices.unshift({
      id: crypto.randomUUID(),
      name: item.name,
      qty: item.qty,
      time: now,
      status: 'Đang chuẩn bị',
    });
  });
  return clone(db.currentRoomSession.orderedServices);
}
export async function getSupportHistory() {
  await delay();
  return clone(db.supportHistory);
}
export async function createSupportRequest(content) {
  await delay();
  const row = {
    id: crypto.randomUUID(),
    time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    content,
    status: 'Đang chờ',
    statusColor: 'bg-amber-500/20 text-amber-400',
  };
  db.supportHistory.unshift(row);
  return clone(row);
}

export async function getAvailableRoomsForRent() {
  await delay();
  return clone([
    {
      id: 'rr1',
      code: 'P402',
      type: 'VIP',
      status: 'Trống',
      priceWeekday: 150000,
      priceWeekend: 200000,
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500',
    },
    {
      id: 'rr2',
      code: 'P305',
      type: 'VIP',
      status: 'Trống',
      priceWeekday: 180000,
      priceWeekend: 250000,
      image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=500',
    },
  ]);
}
export async function rentRoom(id, customerPhone) {
  await delay();
  const room = db.rooms.find((r) => r.code === id.replace('rr', 'P'));
  if (room) room.status = 'Đang hoạt động';
  return { ok: true, customer: customerPhone || 'Khách vãng lai' };
}

export async function getCurrentSessions() {
  await delay();
  return clone(db.currentSessions);
}
export async function checkoutSession(sessionId, points = 0) {
  await delay();
  const s = db.currentSessions.find((x) => x.id === sessionId);
  if (!s) throw new Error('Session not found');
  const roomCost = s.hourlyRate * s.durationHours;
  const serviceCost = s.services.reduce((sum, x) => sum + x.qty * x.price, 0);
  const subtotal = roomCost + serviceCost;
  const discount = Math.min(subtotal, Math.max(0, Number(points || 0) * 1000));
  const total = subtotal - discount;
  return clone({ roomCost, serviceCost, subtotal, discount, total, totalText: vnd(total) });
}

export async function createItem(data) {
  await delay();
  const item = { id: crypto.randomUUID(), ...data };
  db.products.push(item);
  return clone(item);
}
export async function updateItem(id, data) {
  await delay();
  const i = db.products.findIndex((x) => x.id === id);
  if (i < 0) throw new Error('Item not found');
  db.products[i] = { ...db.products[i], ...data };
  return clone(db.products[i]);
}
export async function deleteItem(id) {
  await delay();
  const i = db.products.findIndex((x) => x.id === id);
  if (i < 0) throw new Error('Item not found');
  const [d] = db.products.splice(i, 1);
  return clone(d);
}

export async function getAccounts() {
  await delay();
  return clone(
    db.users.map(({ password: _password, ...u }) => ({
      ...u,
      role: normalizeRole(u.role),
      points: Number(u.points || 0),
    }))
  );
}
export async function createAccount(data) {
  await delay();
  const username = data?.username || `user${db.users.length + 1}`;
  const row = {
    id: crypto.randomUUID(),
    username,
    name: data?.name || '',
    phone: data?.phone || '',
    role: normalizeRole(data?.role),
    points: Number(data?.points || 0),
    password: '123456',
  };
  db.users.push(row);
  const { password: _password, ...safe } = row;
  return clone(safe);
}
export async function updateAccount(id, data) {
  await delay();
  const i = db.users.findIndex((x) => x.id === id);
  if (i < 0) throw new Error('Account not found');
  db.users[i] = {
    ...db.users[i],
    ...data,
    role: normalizeRole(data?.role ?? db.users[i].role),
    points: Number(data?.points ?? db.users[i].points ?? 0),
  };
  const { password: _password, ...safe } = db.users[i];
  return clone(safe);
}
export async function deleteAccount(id) {
  await delay();
  const i = db.users.findIndex((x) => x.id === id);
  if (i < 0) throw new Error('Account not found');
  const [deleted] = db.users.splice(i, 1);
  const { password: _password, ...safe } = deleted;
  return clone(safe);
}

