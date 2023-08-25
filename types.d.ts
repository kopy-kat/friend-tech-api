// User Details
export interface UserDetails {
    id: number;
    address: string;
    twitterUsername: string;
    twitterName: string;
    twitterPfpUrl: string;
    twitterUserId: string;
    lastOnline: number;
    holderCount: number;
    holdingCount: number;
    shareSupply: number;
    displayPrice: string;
    lifetimeFeesCollectedInWei: string;
  }
  
  // Trader and Subject
  interface TraderSubject {
    address: string;
    pfpUrl: string;
    username: string;
    name: string;
  }
  
  // Holdings Activity
  export interface HoldingsActivityEvent {
    trader: TraderSubject;
    subject: TraderSubject;
    isBuy: boolean;
    shareAmount: string;
    ethAmount: string;
    createdAt: number;
  }
  
  export interface HoldingsActivity {
    events: HoldingsActivityEvent[];
    nextPageStart: number;
  }
  
  // Friends Activity
  export interface FriendsActivityEvent {
    trader: TraderSubject;
    subject: TraderSubject;
    isBuy: boolean;
    shareAmount: string;
    ethAmount: string;
    createdAt: number;
  }
  
  export interface FriendsActivity {
    events: FriendsActivityEvent[];
    nextPageStart: number;
  }
  
  // Portfolio
  export interface PortfolioHolding {
    pfpUrl: string;
    username: string;
    name: string;
    subject: string;
    chatRoomId: string;
    price: string;
    balance: string;
    balanceEthValue: string;
    lastOnline: number | null;
    lastMessageName: string;
    lastMessageTime: number;
    lastMessageText: string;
    lastRead: number;
  }
  
  export interface Portfolio {
    holdings: PortfolioHolding[];
    portfolioValueWei: string;
    nextPageStart: number;
  }
  
  // Points
  export interface Points {
    address: string;
    totalPoints: number;
    tier: string;
  }
  
  // Used Code
  export interface UsedCode {
    isAddressInvited: boolean;
  }
  
  // Gating State
  export interface GatingState {
    isAccepted: boolean;
  }
  
  // Chatroom Enabled
  export interface ChatroomEnabled {
    isEnabled: true;
  }
  
  // Users by ID
  export interface UserById extends UserDetails {}
  
  // Search Users by Twitter Handle
  export interface SearchUsers {
    users: UserDetails[];
  }
  
  // Events
  export interface Event {
    id: number;
    blurredUrl: string;
    isNSFW: boolean;
    caption: string | null;
    value: string;
    surplus: string;
    previousOwner: string;
    stealer: string;
    creator: string;
    previousOwnerPfpUrl: string;
    previousOwnerUsername: string;
    stealerPfpUrl: string | null;
    stealerUsername: string | null;
    creatorPfpUrl: string;
    creatorUsername: string;
  }
  
  export interface Events {
    events: Event[];
  }
  
  // Top List by Price
  export interface TopListByPrice {
    users: UserDetails[];
  }
  
  // Trending
  export interface TrendingUser {
    twitterUsername: string;
    twitterName: string;
    twitterPfpUrl: string;
    lastOnline: number;
    displayPrice: string;
    volume: string;
    netBuy: string;
  }
  
  export interface Trending {
    users: TrendingUser[];
  }
  
  // Bonus Endpoints
  // Accounts (undetermined)
  // Kosetto Config
  export interface KosettoConfig {
    minAppVersionIOS: string;
    minAppVersionAndroid: string;
    gachaCost: number;
    network: string;
    contractAddress: string;
    gachaLaunchMs: number;
  }
  
  // Error Response
  export interface ErrorResponse {
    message: string;
  }
