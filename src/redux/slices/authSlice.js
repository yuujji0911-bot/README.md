// Redux 상태 관리 - 인증 슬라이스
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
  user: null, // { uid, email, displayName, photoURL, createdAt }
  isAuthenticated: false,
  loading: false,
  error: null,
  authMethod: null // 'email' | 'google'
};

/**
 * 비동기 썽크: 이메일 회원가입
 */
export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      // Firebase 연동 시 실제 구현
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(userCredential.user, { displayName });
      
      return {
        uid: `user-${Date.now()}`,
        email,
        displayName,
        photoURL: null,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 비동기 썽크: 이메일 로그인
 */
export const signInWithEmail = createAsyncThunk(
  'auth/signInWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Firebase 연동 시 실제 구현
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      return {
        uid: `user-${Date.now()}`,
        email,
        displayName: 'User',
        photoURL: null,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 비동기 썽크: Google 로그인
 */
export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      // Firebase 연동 시 실제 구현
      // const result = await signInWithPopup(auth, googleProvider);
      // const user = result.user;
      
      return {
        uid: `user-${Date.now()}`,
        email: 'user@gmail.com',
        displayName: 'Google User',
        photoURL: null,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 비동기 썽크: 로그아웃
 */
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Firebase 연동 시 실제 구현
      // await signOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 비동기 썽크: 현재 사용자 확인
 */
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      // Firebase 연동 시 실제 구현
      // const user = auth.currentUser;
      // return user ? { uid, email, ... } : null;
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 인증 슬라이스
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 인증 상태 초기화
    resetAuthError: (state) => {
      state.error = null;
    },

    // 사용자 정보 업데이트
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload
        };
      }
    },

    // 로딩 상태 설정
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },

  extraReducers: (builder) => {
    // 이메일 회원가입
    builder
      .addCase(signUpWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.authMethod = 'email';
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // 이메일 로그인
    builder
      .addCase(signInWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.authMethod = 'email';
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Google 로그인
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.authMethod = 'google';
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // 로그아웃
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.authMethod = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 현재 사용자 확인
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});

// 액션 내보내기
export const {
  resetAuthError,
  updateUserProfile,
  setLoading
} = authSlice.actions;

// 셀렉터
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthMethod = (state) => state.auth.authMethod;
export const selectUserEmail = (state) => state.auth.user?.email;
export const selectUserDisplayName = (state) => state.auth.user?.displayName;
export const selectUserUID = (state) => state.auth.user?.uid;

export default authSlice.reducer;
