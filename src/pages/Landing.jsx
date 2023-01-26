import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { motion } from "framer-motion";

import AuthButton from "../components/button/AuthButton";
import ProfileCard from "../components/card/ProfileCard";
import CompositionOfImages from "../components/composition/CompositionOfImages";
import Footer from "../components/footer/Footer";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import { useGetAuhorsForCardQuery } from "../features/user/usersSlice";
import LandingLayout from "../layouts/LandingLayout";
import Logo from "./../assets/img/logodnm4.png";
import Soc from "./../assets/img/soc.jpg";
import "./../styles/sass/main.scss";
import ResourceNotFound from "../components/error/ResourceNotFound";
import { checkAuthByCookie } from "../validation/conditions/checkAuthByBrowserCookie";
import { BRAND } from "../config/constants";

const Landing = () => {
  const {
    data: authors,
    isLoading,
    isError,
    error,
  } = useGetAuhorsForCardQuery();

  return (
    <LandingLayout>
      <header className="header">
        <div className="header__logo-box">
          <img src={Logo} alt="Logo" className="header__logo" />
        </div>
        <div className="header__login-box">
          {checkAuthByCookie() ? (
            <Link to="/home">
              <AuthButton text="Devam Et" />
            </Link>
          ) : (
            <Link to="/auth">
              <AuthButton text="Aramıza Katıl" />
            </Link>
          )}
        </div>

        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">{BRAND}</span>
            <span className="heading-primary--sub">Ne eserse...</span>
          </h1>

          <Link to="/home" className="btn btn--white btn--animated">
            Anasayfaya Git
          </Link>
        </div>
      </header>
      <Container maxWidth="md">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="u-margin-top-small"
        >
          <div className="u-center-text p-padding-bottom-big">
            <h2 className="heading-secondary p-padding-bottom-big">
              Dergimize Katılmak İster misiniz ?
            </h2>
            <p className="paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              expedita at dolorum modi molestias corrupti unde reprehenderit
              repellat voluptatibus doloremque, quae delectus voluptates vel non
              tempore esse nisi exercitationem laborum asperiores ullam deleniti
              distinctio! Nulla quibusdam expedita repudiandae minus et?
            </p>
            <p className="paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              excepturi fugit dolores soluta, aperiam nam ipsa magni minima sed
              quisquam ipsum saepe. Facilis cum odit nam fugiat ipsam
              voluptatem? Officiis eaque repudiandae laborum fugit neque aliquid
              dolore voluptatibus aut fuga ad exercitationem vitae, fugiat sunt
              magnam earum consequatur expedita illum rerum quia eius laboriosam
              accusamus similique nemo. Magni sed harum, tempora odio cupiditate
              expedita facilis dolorum sunt, adipisci velit vero placeat.
              Voluptas quos consectetur officia hic exercitationem! Officia
              voluptas, earum non totam temporibus perspiciatis et cupiditate
              fugiat dolor sunt adipisci! Magnam eos similique facilis soluta
              error reprehenderit perspiciatis sunt repudiandae nemo. Molestiae
              vero odit id aliquam. Ad ratione aperiam assumenda totam
              consequuntur itaque voluptates incidunt cum aspernatur, cupiditate
              quia, quae rerum et! Hic modi quidem quia nemo pariatur iste,
              dolorem similique debitis aperiam temporibus, molestias dolores
              mollitia, itaque nam? Perferendis corrupti, nihil voluptate sint
              facere nesciunt consectetur exercitationem dolores iure.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="u-center-text p-padding-bottom-big">
            <h2 className="heading-secondary p-padding-bottom-big">
              Her Konu Hakkında Yaz !
            </h2>
            <Grid2 container spacing={4} sx={{ mb: 5 }}>
              <Grid2 xs={12} md={6}>
                <p className="paragraph">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate aperiam harum aut sed distinctio nesciunt optio
                  modi, cupiditate unde libero eaque iste commodi animi nulla.
                  Debitis nemo voluptatibus ipsam qui voluptas excepturi
                  quisquam eos a quod totam quo repellat ea nostrum magni
                  voluptatum provident eveniet quibusdam, quis harum explicabo
                  repudiandae!
                </p>
              </Grid2>
              <Grid2 xs={12} md={6}>
                <CompositionOfImages />
              </Grid2>
            </Grid2>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 1 }}
          viewport={{ once: false, amount: 0.1 }}
        >
          <div className="u-center-text p-padding-bottom-small">
            <h2 className="heading-secondary p-padding-bottom-big">
              Yazarlarımız
            </h2>
            <Grid2 container spacing={4} sx={{ mb: 5 }}>
              {isLoading ? (
                <MainLoadingComp isLoading={isLoading} />
              ) : isError ? (
                <ResourceNotFound isError={isError} error={error} />
              ) : (
                authors?.map((author) => (
                  <Grid2 key={author?.id} xs={12} sm={6} md={4}>
                    <ProfileCard author={author} bgImage={Soc} />
                  </Grid2>
                ))
              )}
            </Grid2>
          </div>
        </motion.div>
      </Container>
      <Footer />
    </LandingLayout>
  );
};

export default Landing;
