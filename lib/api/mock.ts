import type {
  Worker,
  User,
  Job,
  Proposal,
  Review,
  Conversation,
  Message,
  Notification,
  Subscription,
  AuthResponse,
} from "@/types/api";

const mockUsers: User[] = [
  { id: "u1", email: "andi@example.com", firstName: "Andi", lastName: "Kola", phone: "+355691234567", role: "WORKER" },
  { id: "u2", email: "genti@example.com", firstName: "Genti", lastName: "Mema", phone: "+355692234567", role: "WORKER" },
  { id: "u3", email: "mira@example.com", firstName: "Mira", lastName: "Hoxha", phone: "+355693234567", role: "WORKER" },
  { id: "u4", email: "ermal@example.com", firstName: "Ermal", lastName: "Selmani", phone: "+355694234567", role: "WORKER" },
  { id: "u5", email: "klodi@example.com", firstName: "Klodi", lastName: "Beqiri", phone: "+355695234567", role: "WORKER" },
  { id: "u6", email: "besa@example.com", firstName: "Besa", lastName: "Lala", phone: "+355696234567", role: "WORKER" },
  { id: "u7", email: "drilon@example.com", firstName: "Drilon", lastName: "Aliaj", phone: "+355697234567", role: "WORKER" },
  { id: "c1", email: "client@example.com", firstName: "Test", lastName: "Client", phone: "+355698234567", role: "CLIENT" },
];

export const mockWorkers: Worker[] = [
  {
    id: "w1", userId: "u1", user: mockUsers[0], bio: "Elektricist me 15 vjet eksperiencë. Punoj me sisteme shtëpiake dhe industriale.",
    businessName: "Kola Elektrike", cities: ["Tiranë", "Durrës"], categories: ["electrician"],
    rating: 4.9, reviewCount: 47, jobsCompleted: 89, startsAt: 3000, verified: true, idUploaded: true,
  },
  {
    id: "w2", userId: "u2", user: mockUsers[1], bio: "Hidraulik profesional. Riparime, instalime, mirëmbajtje tubacionesh.",
    cities: ["Durrës", "Tiranë"], categories: ["plumber"],
    rating: 4.7, reviewCount: 32, jobsCompleted: 61, startsAt: 2500, verified: true, idUploaded: true,
  },
  {
    id: "w3", userId: "u3", user: mockUsers[2], bio: "Shërbime pastrimi profesionale për shtëpi dhe zyra. Pastrim i thellë, pastrim pas ndërtimit.",
    cities: ["Vlorë", "Fier"], categories: ["cleaner"],
    rating: 4.8, reviewCount: 56, jobsCompleted: 120, startsAt: 2000, verified: true, idUploaded: true,
  },
  {
    id: "w4", userId: "u4", user: mockUsers[3], bio: "Mekanik me specializim në makina evropiane. Diagnostikim kompjuterik, riparime motorri.",
    businessName: "Auto Selmani", cities: ["Tiranë"], categories: ["mechanic"],
    rating: 4.6, reviewCount: 28, jobsCompleted: 45, startsAt: 3500, verified: false, idUploaded: true,
  },
  {
    id: "w5", userId: "u5", user: mockUsers[4], bio: "Piktor dekorativ dhe industrial. Lyerje shtëpish, zyresh, dhe fasadash.",
    cities: ["Shkodër", "Tiranë"], categories: ["painter"],
    rating: 4.5, reviewCount: 19, jobsCompleted: 34, startsAt: 2000, verified: true, idUploaded: true,
  },
  {
    id: "w6", userId: "u6", user: mockUsers[5], bio: "Pastruese me përvojë në hotel dhe ambiente rezidenciale. Organizim dhe pastrim.",
    cities: ["Elbasan", "Tiranë"], categories: ["cleaner"],
    rating: 4.9, reviewCount: 63, jobsCompleted: 150, startsAt: 1500, verified: true, idUploaded: true,
  },
  {
    id: "w7", userId: "u7", user: mockUsers[6], bio: "Elektricist dhe hidraulik. Punoj në Korçë dhe rrethinë. Çmime konkurruese.",
    cities: ["Korçë", "Pogradec"], categories: ["electrician", "plumber"],
    rating: 4.4, reviewCount: 15, jobsCompleted: 22, startsAt: 2000, verified: false, idUploaded: false,
  },
];

export const mockJobs: Job[] = [
  {
    id: "j1", title: "Riparim instalimi elektrik", description: "Kam nevojë për riparim të instalimit elektrik në shtëpi, 3 dhoma. Probleme me prizat.", category: "electrician", city: "Tiranë", status: "OPEN",
    expiresAt: "2026-06-15T00:00:00Z", clientId: "c1", client: mockUsers[7], proposalCount: 3, createdAt: "2026-05-20T10:00:00Z",
  },
  {
    id: "j2", title: "Pastrim apartamenti", description: "Apartament 2+1 në Durrës. Pastrim i thellë para se të shkoj me pushime.", category: "cleaner", city: "Durrës", status: "OPEN",
    expiresAt: "2026-06-01T00:00:00Z", clientId: "c1", client: mockUsers[7], proposalCount: 1, createdAt: "2026-05-18T10:00:00Z",
  },
  {
    id: "j3", title: "Lyerje dhome ndenjjeje", description: "Dhomë ndenjjeje ~25 m². Dëshiroj ngjyrë të bardhë mat. Materiali përfshihet.", category: "painter", city: "Tiranë", status: "OPEN",
    expiresAt: "2026-06-10T00:00:00Z", clientId: "c1", client: mockUsers[7], proposalCount: 0, createdAt: "2026-05-19T10:00:00Z",
  },
];

export const mockProposals: Proposal[] = [
  { id: "p1", jobId: "j1", workerId: "w1", worker: mockWorkers[0], message: "Jam i disponueshëm javën e ardhshme. Mund ta shof instaliimin dhe t'ju jap çmim fiks.", priceEstimate: 5000, status: "PENDING", createdAt: "2026-05-21T10:00:00Z" },
  { id: "p2", jobId: "j1", workerId: "w7", worker: mockWorkers[6], message: "E bëj me çmim të mirë. Eksperiencë 10 vjet.", priceEstimate: 4000, status: "PENDING", createdAt: "2026-05-21T14:00:00Z" },
  { id: "p3", jobId: "j2", workerId: "w3", worker: mockWorkers[2], message: "Pastrimi i thellë për apartament 2+1 zgjat rreth 4-5 orë.", priceEstimate: 3500, status: "PENDING", createdAt: "2026-05-19T10:00:00Z" },
];

export const mockReviews: Review[] = [
  { id: "r1", workerId: "w1", clientId: "c1", client: mockUsers[7], rating: 5, comment: "Punë e shkëlqyer! Shumë profesional.", createdAt: "2026-04-15T10:00:00Z" },
  { id: "r2", workerId: "w1", clientId: "c1", client: mockUsers[7], rating: 4, comment: "I mirë, por u vonua pak.", createdAt: "2026-03-10T10:00:00Z" },
  { id: "r3", workerId: "w3", clientId: "c1", client: mockUsers[7], rating: 5, comment: "Apartamenti shkëlqente pastër! Faleminderit Mira.", createdAt: "2026-05-01T10:00:00Z" },
];

export const mockConversations: Conversation[] = [
  { id: "conv1", otherUser: mockUsers[0], lastMessage: "Po, jam i disponueshëm nesër.", lastMessageAt: "2026-05-22T15:30:00Z", unreadCount: 1 },
  { id: "conv2", otherUser: mockUsers[2], lastMessage: "Faleminderit për punën!", lastMessageAt: "2026-05-20T10:00:00Z", unreadCount: 0 },
];

export const mockMessages: Message[] = [
  { id: "m1", senderId: "c1", receiverId: "u1", content: "Përshëndetje, a jeni i disponueshëm këtë javë?", isRead: true, createdAt: "2026-05-22T14:00:00Z" },
  { id: "m2", senderId: "u1", receiverId: "c1", content: "Po, jam i disponueshëm nesër.", isRead: false, createdAt: "2026-05-22T15:30:00Z" },
  { id: "m3", senderId: "c1", receiverId: "u3", content: "Faleminderit për punën!", isRead: true, createdAt: "2026-05-20T10:00:00Z" },
];

export const mockNotifications: Notification[] = [
  { id: "n1", userId: "c1", title: "New proposal", body: "Andi Kola submitted a proposal for your job.", isRead: false, createdAt: "2026-05-22T10:00:00Z" },
  { id: "n2", userId: "c1", title: "Message received", body: "You have a new message from Mira Hoxha.", isRead: true, createdAt: "2026-05-20T10:00:00Z" },
];

export const mockLogin = (email: string, _password: string): AuthResponse | null => {
  const user = mockUsers.find((u) => u.email === email);
  if (!user) {
    return { accessToken: "mock-access-token", refreshToken: "mock-refresh-token", user: mockUsers[7] };
  }
  return { accessToken: "mock-access-token", refreshToken: "mock-refresh-token", user };
};

export const mockRegister = (data: { firstName: string; lastName: string; email: string; phone?: string; role: string }): AuthResponse => {
  const user: User = {
    id: `u${Date.now()}`,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    role: data.role as "CLIENT" | "WORKER",
  };
  return { accessToken: "mock-access-token", refreshToken: "mock-refresh-token", user };
};
