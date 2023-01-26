import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import NewPost from "./pages/NewPost";
import PersistLogin from "./security/PersistLogin";
import PostsByCategoryPage from "./pages/PostsByCategoryPage";
import PostByID from "./pages/PostByID";
import ScrollToTop from "./utils/ScrollToTop";
import RequireNoAuth from "./security/RequireNoAuth";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./features/auth/authSlice";
import RequireAuth from "./security/RequireAuth";
import EditUser from "./pages/EditUser";
import Construction from "./pages/Construction";
import EditorUpdatePost from "./pages/EditorUpdatePost";
import EditorNewPost from "./pages/EditorNewPost";
import Users from "./pages/Users";
import CategoryPage from "./pages/CategoryPage";
import MainPage from "./pages/MainPage";
import NoPage from "./pages/NoPage";
import DeactivatedPosts from "./pages/DeactivatedPosts";

const ROLES = {
  User: "ROLE_USER",
  Author: "ROLE_AUTHOR",
  Editor: "ROLE_EDITOR",
  Admin: "ROLE_ADMIN",
};
const ApplicationRoute = () => {
  const accessToken = useSelector(selectCurrentToken);
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />

          <Route
            path="auth"
            element={
              <RequireNoAuth accessToken={accessToken}>
                <Auth />
              </RequireNoAuth>
            }
          />
          <Route element={<PersistLogin />}>
            <Route path="/home" element={<MainPage />} />
            <Route path="construction" element={<Construction />} />
            <Route path="/posts">
              <Route index element={<Home />} />
              <Route path=":postId" element={<PostByID />} />
              <Route
                path="newPost"
                element={
                  <RequireAuth
                    accessToken={accessToken}
                    allowedRoles={ROLES.Author}
                  >
                    <NewPost />
                  </RequireAuth>
                }
              />
              <Route
                path="editPost/:postId"
                element={
                  <RequireAuth allowedRoles={ROLES.Author}>
                    <EditPost />
                  </RequireAuth>
                }
              />
              <Route
                path="category/:categoryName"
                element={<PostsByCategoryPage />}
              />
            </Route>
            <Route path="/users">
              <Route path=":username" element={<Profile />} />
              <Route
                path="editUser/:username"
                element={
                  <RequireAuth
                    accessToken={accessToken}
                    allowedRoles={ROLES.Author}
                  >
                    <EditUser />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/editor">
              <Route
                path="editPost/:postId"
                element={
                  <RequireAuth
                    accessToken={accessToken}
                    allowedRoles={ROLES.Editor}
                  >
                    <EditorUpdatePost />
                  </RequireAuth>
                }
              />
              <Route
                path="newPost"
                element={
                  <RequireAuth
                    accessToken={accessToken}
                    allowedRoles={ROLES.Editor}
                  >
                    <EditorNewPost />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/administration">
              <Route
                path="users"
                element={
                  <RequireAuth
                    accessToken={accessToken}
                    allowedRoles={ROLES.Admin}
                  >
                    <Users />
                  </RequireAuth>
                }
              />
              <Route
                path="categories"
                element={
                  <RequireAuth
                    accessToken={accessToken}
                    allowedRoles={ROLES.Admin}
                  >
                    <CategoryPage />
                  </RequireAuth>
                }
              />
              <Route
                path="deactivatedPosts"
                element={
                  <RequireAuth
                    accessToken={accessToken}
                    allowedRoles={ROLES.Admin}
                  >
                    <DeactivatedPosts />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Route>
        </Route>
      </Routes>
    </ScrollToTop>
  );
};

export default ApplicationRoute;
