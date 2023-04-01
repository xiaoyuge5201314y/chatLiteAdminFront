import { http } from "@/utils/http";
// 人工智能聊天-询问答案
export const openAiResults = data => {
  return http.request<any>("post", "/chatMessage/ask/1", { data });
};


// ai模型管理-列表不分页
export const aiModelList = ()=> {
  return http.request<any>("get", "/aiModel/list");
};


// ai模型配置管理-列表不分页
export const aiModelConfigList = () => {
  return http.request<any>("get", "/aiModelConfig/list");
};

/**
 * 消息-消息列表
 */
export const messageList = () => {
  return http.request<any>("get", "/chatMessage/list/1");
};
