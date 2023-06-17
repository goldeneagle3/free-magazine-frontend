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
import Contact from "./pages/Contact";
import Mail from "./pages/Mail";
import SingleMail from "./pages/SingleMail";
import PostsBySubCategoryPage from "./pages/PostsBySubCategoryPage";
import Activation from "./pages/Activation";
import ResetPassword from "./pages/ResetPassword";
import NewMasterpiece from "./pages/NewMasterpiece";
import Music from "./pages/Music";
import Picture from "./pages/Picture";
import Movie from "./pages/Movie";

const ROLES = {
  User: "ROLE_USER",
  Author: "ROLE_AUTHOR",
  Editor: "ROLE_EDITOR",
  Admin: "ROLE_ADMIN",
};
Object.freeze(ROLES);

const ApplicationRoute = () => {
  const accessToken = useSelector(selectCurrentToken);
  return (
    <ScrollToTop>
      <Routes>
        <Route element={<PersistLogin />}>
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
            <Route path="/home" element={<MainPage />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="construction" element={<Construction />} />
            <Route path="/activation/:token" element={<Activation />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
            <Route path="/musicById/:id" element={<Music />} />
            <Route path="/pictureById/:id" element={<Picture />} />
            <Route path="/movieById/:id" element={<Movie />} />
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
              <Route path="category">
                <Route path=":categoryName" element={<PostsByCategoryPage />} />
                <Route
                  path=":categoryName/subCategory/:subCategoryId"
                  element={<PostsBySubCategoryPage />}
                />
              </Route>
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
              <Route path="masterpieces">
                <Route
                  index
                  element={
                    <RequireAuth
                      accessToken={accessToken}
                      allowedRoles={(ROLES.Admin, ROLES.Editor)}
                    >
                      <NewMasterpiece />
                    </RequireAuth>
                  }
                />
              </Route>

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
              <Route path="mails">
                <Route
                  index
                  element={
                    <RequireAuth
                      accessToken={accessToken}
                      allowedRoles={ROLES.Admin}
                    >
                      <Mail />
                    </RequireAuth>
                  }
                />
                <Route
                  path=":messageId"
                  element={
                    <RequireAuth
                      accessToken={accessToken}
                      allowedRoles={ROLES.Admin}
                    >
                      <SingleMail />
                    </RequireAuth>
                  }
                />
              </Route>
            </Route>
            <Route path="*" element={<NoPage />} />
          </Route>
        </Route>
      </Routes>
    </ScrollToTop>
  );
};

export default ApplicationRoute;
