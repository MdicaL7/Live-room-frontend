import axios from "./axios";

//获取单个直播间详情
export function getLiveRoomDetail(id){
    return axios.get(`/liveRoom/${id}`)
}

//获取直播间列表
export function getLiveRoomList() {
  return axios.get('/liveRoom')
}