import { configureStore } from "@reduxjs/toolkit";
import WfsCentreCoordReducer from "../slices/WfsCentreCoordSlice";
import { GrundstuecksparzellierungWFSService } from "../services/GrundstuecksparzellierungWFSService";
import { ApplicationAPISlice } from "../slices/applications/ApplicationAPISlice";
import { FileAPISlice } from "../slices/documents/ApplicationFileAPISlice";
import AuthUserSliceReducer from "../slices/AuthUserSlice";
import { GetMeAPISlice } from "../slices/user/GetUserAPISlice";
import { ApplicantAPISlice } from "../slices/applicants/ApplicantsAPISlice";

//Redux store
export const store = configureStore({
  reducer: {
    wfsCentreCoord: WfsCentreCoordReducer,
    authUser: AuthUserSliceReducer,
    [GrundstuecksparzellierungWFSService.reducerPath]:
      GrundstuecksparzellierungWFSService.reducer,
    [ApplicationAPISlice.reducerPath]: ApplicationAPISlice.reducer,
    [GetMeAPISlice.reducerPath]: GetMeAPISlice.reducer,
    [ApplicantAPISlice.reducerPath]: ApplicantAPISlice.reducer,
    [FileAPISlice.reducerPath]: FileAPISlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      GrundstuecksparzellierungWFSService.middleware,
      ApplicationAPISlice.middleware,
      GetMeAPISlice.middleware,
      ApplicantAPISlice.middleware,
      FileAPISlice.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
