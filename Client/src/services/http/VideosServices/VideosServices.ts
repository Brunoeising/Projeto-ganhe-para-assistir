import api from "../../api";

type StartVideoBody = {
  videoId: string;
  wallet: string;
};

type VideosServicesTypes = {
  getVideo: (id: string) => Promise<any>;
  getVideosFromChannel: (channelId: string) => Promise<any>;
  startVideoOnServer: (body: StartVideoBody) => Promise<any>;
  getReward: (verifyId: string) => Promise<any>;
  stopVideoOnServer: (id: string) => Promise<any>;
};

export const VideosServices: VideosServicesTypes = {
  getVideo: async (id: string) => {
    try {
      const response = await api.get(`/video/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getVideosFromChannel: async (channelId: string) => {
    try {
      const response = await api.get(`/video/parceiro/${channelId}`);
      return response.data.items;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  startVideoOnServer: async (body) => {
    try {
      const response = await api.post(`/video/playvideo`, body);
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  stopVideoOnServer: async (id) => {
    try {
      const response = await api.get(`/video/stopvideo/${id}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  },
  getReward: async (verifyId: string) => {
    try {
      const response = await api.get(`/video/getreward/${verifyId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  },
};
