export type UserBody = {
  username: string;
  wallet?: string;
};

export type User = {
  _id: string;
  username: string;
  wallet: string;
  earnedTokens: number;
  createdAt: Date;
  updatedAt: Date;
  saldo?: number;
  videosWatched?: number;
  videosWatchedToday?: number;
  tokensEarnedToday?: number;
  roles?: string[];
  __v: number;
};

export type NFT = {
  _id: string;
  nome: string;
  raridade: number;
  validade: number;
  recompensa: number;
  limite_dia: number;
  limite_saque: number;
  dayNFTExpires: string;
  __v: number;
};

export type UserRegisterResponse = {
  user: User;
  message: string;
};

export type Id = {
  kind: string;
  videoId?: string;
  channelId?: string;
};

export type Default = {
  url: string;
  width?: number;
  height?: number;
};

export type Medium = {
  url: string;
  width?: number;
  height?: number;
};

export type High = {
  url: string;
  width?: number;
  height?: number;
};

export interface Standard {
  url: string;
  width: number;
  height: number;
}

export interface Maxres {
  url: string;
  width: number;
  height: number;
}

export interface Thumbnails {
  default: Default;
  medium: Medium;
  high?: High;
  standard?: Standard;
  maxres?: Maxres;
}

export type ResourceId = {
  kind: string;
  videoId: string;
};

export type Snippet = {
  publishedAt: Date | string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent?: string;
  publishTime?: Date | string;
  position?: number;
  resourceId?: ResourceId;
  videoOwnerChannelTitle?: string;
  videoOwnerChannelId?: string;
};

export type Video = {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
};
