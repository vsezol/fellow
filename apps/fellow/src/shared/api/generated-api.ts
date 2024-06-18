import { emptyApi as api } from './empty-api';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        method: 'POST',
        body: queryArg.createUserRequest,
      }),
    }),
    createGroup: build.mutation<CreateGroupApiResponse, CreateGroupApiArg>({
      query: (queryArg) => ({
        url: `/groups`,
        method: 'POST',
        body: queryArg.createGroupRequest,
      }),
    }),
    changeStatus: build.mutation<ChangeStatusApiResponse, ChangeStatusApiArg>({
      query: (queryArg) => ({
        url: `/users/status`,
        method: 'PATCH',
        body: queryArg.changeStatusRequest,
      }),
    }),
    getUser: build.query<GetUserApiResponse, GetUserApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.username}` }),
    }),
    getUserActivity: build.query<
      GetUserActivityApiResponse,
      GetUserActivityApiArg
    >({
      query: (queryArg) => ({ url: `/users/${queryArg.username}/activity` }),
    }),
    getHistory: build.query<GetHistoryApiResponse, GetHistoryApiArg>({
      query: (queryArg) => ({
        url: `/history/${queryArg.groupId}`,
        params: {
          pageNumber: queryArg.pageNumber,
          pageSize: queryArg.pageSize,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedApi };
export type CreateUserApiResponse = /** status 200 OK */ Unit;
export type CreateUserApiArg = {
  createUserRequest: CreateUserRequest;
};
export type CreateGroupApiResponse = /** status 200 OK */ CreateGroupResponse;
export type CreateGroupApiArg = {
  createGroupRequest: CreateGroupRequest;
};
export type ChangeStatusApiResponse = /** status 200 OK */ Unit;
export type ChangeStatusApiArg = {
  changeStatusRequest: ChangeStatusRequest;
};
export type GetUserApiResponse = /** status 200 OK */ UserResponse;
export type GetUserApiArg = {
  username: string;
};
export type GetUserActivityApiResponse =
  /** status 200 OK */ UserActivityResponse;
export type GetUserActivityApiArg = {
  username: string;
};
export type GetHistoryApiResponse =
  /** status 200 OK */ PageableHistoryResponse;
export type GetHistoryApiArg = {
  groupId: string;
  pageNumber: number;
  pageSize: number;
};
export type Unit = object;
export type CreateUserRequest = {
  username: string;
  status: string;
};
export type CreateGroupResponse = {
  id: string;
};
export type CreateGroupRequest = {
  members: string[];
};
export type ChangeStatusRequest = {
  username: string;
  status: string;
};
export type UserResponse = {
  id: string;
  username: string;
  status: string;
  isOnline: boolean;
  lastLoginTimestamp?: string;
};
export type LastChatMessageResponse = {
  id: string;
  chatId: string;
  chatName: string;
  sender: string;
  members: string[];
  message: string;
  timestamp: string;
};
export type UserActivityResponse = {
  userStatus: string;
  lastMessages: LastChatMessageResponse[];
};
export type ChatMessageResponse = {
  /** Message ID */
  id: string;
  /** Sender username */
  from: string;
  /** Group id */
  to: string;
  /** Message content */
  message: string;
  /** Timestamp of the message */
  timestamp: string;
};
export type PageableHistoryResponse = {
  page: ChatMessageResponse[];
  total: number;
};
export const {
  useCreateUserMutation,
  useCreateGroupMutation,
  useChangeStatusMutation,
  useGetUserQuery,
  useGetUserActivityQuery,
  useGetHistoryQuery,
} = injectedRtkApi;
