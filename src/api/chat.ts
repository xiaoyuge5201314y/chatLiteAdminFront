/*
 * @Description:
 * @Version: 1.0
 * @Author: wudongyu
 * @Date: 2023-03-14 15:30:46
 * @LastEditors: wudongyu
 * @LastEditTime: 2023-03-31 15:38:35
 */
import { http } from "@/utils/http";

export const addChatCounts = (data: { id: string; counts: number }) => {
  return http.post(`/chat/addChatCounts`, { data });
};
