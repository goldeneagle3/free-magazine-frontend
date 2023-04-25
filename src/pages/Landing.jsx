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
            <span className="heading-primary--main white-1">{BRAND}</span>
            <span className="heading-primary--sub white-2">Özgün , Keskin ve Sağlam</span>
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
          viewport={{ once: false, amount: 0.1 }}
          className="u-margin-top-small"
        >
          <div className="u-center-text p-padding-bottom-big">
            <h2 className="heading-secondary p-padding-bottom-big">
              Dergimize Yazar Olun !
            </h2>
            <p className="paragraph--parsed">
              İlgi duyduğun ve hakkında bilgi sahibi olduğun bir alan veya alanlar var ise ve bu alanlar üzerinde özgün fikirlere sahibim de diyorsan eğer seni aramızda görmeyi çok isteriz. Üzerinde durmak istediğin veya yazmak istediğin konular hakkında uzman olman , çok okumuş olman veya çok pratik yapmış olman bizim için şart değil ancak eleştiriye açık olman , fikirlerinde dürüst olman, özgürlükçü bir zihniyete sahip olman ve her görüşe saygı duyman bizim senden mutlak beklentilerimizdir.    
            </p>
            <h2 className="heading-secondary p-padding-bottom-big">
              Format
            </h2>
            <p className="paragraph--parsed">
              Dergimizin formatını, amatör ve öğrenmeye açık yazarlarımızın bilgilerini çoğaltmaya , düşüncelerini ve vizyonlarını geliştirmeye yönelik olması zımnında çalışmak temel gayemizdir. Bu hedef yolunda öncelikli olarak dergiye , sosyal medya uygulamalarında da gördüğümüz , yorum ekleme ve beğeni butonu ekledik. Yazar sayımıza da kota ekledik. Kota koymadaki ana nedenlerimizi öncelikli olarak yazarlara ücret vermek(tabi ki bu dergi gelir elde etmeye başladıktan sonra olacak) ve sonrasında yazar veya yazar adayları arasındaki rekabeti arttırmak olarak sıralayabiliriz. Bunun yanı sıra , genç ve amatör yazarlarımıza ilham olması , onlarla iletişime geçip onlara tavsiyelerde bulunması ve beklenildiği gibi dergimize kalite katması için alanında uzman hocalarımızı da dergiye kazandırmaya çalışacağız.     
            </p>
            <h2 className="heading-secondary p-padding-bottom-big">
              Yazar Adayları
            </h2>
            <p className="paragraph--parsed">
              Dergimize yazar olmanın birkaç yolu vardır. Bunlardan birini formattan da anlayabileceğiniz üzere dergiye üye olduktan sonra mevcut olan yazarlarımızın yazılarına yaptığınız yorumlarınızın aldığı etkileşimler üzerine yazar olmaya hak kazanmanız olarak açıklayabiliriz. Eğer yazar kotamız dolu ve yorumlarınız da oldukça etkileşim yani beğeni alıyorsa , sizi mevcut yazarlarımızdan en az ilgi gören , en az okunan veya en pasif olan biriyle , sizinle kıyas yaptıktan sonra , takas yapma durumu ortaya çıkabilir ve sonuç olarak yazar olma şansınız hiçbir engelle karşılaşmadan devam eder. Bir diğer yol ise sosyal medyada veya başka mecralarda , yazılarıyla veya söylemleriyle dikkatimizi çekmeyi başaran insanlara göndereceğimiz davetlerdir. Yazar olmanın bir başka yöntemi ise bizimle iletişime geçip , örnek olarak gösterebileceğiniz bir yazıyı tarafımıza göndermeniz ve bu yazının , tarafımızca iyi analiz edilip , kabul gördükten sonra yazar olarak kabul edilmenizdir. Bu yol yazar olmanın en kestirme yoludur.       
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
              İstediğin Konu Hakkında Yaz !
            </h2>
            <Grid2 container spacing={4} sx={{ mb: 5 }}>
              <Grid2 xs={12} md={6}>
                <p className="paragraph--parsed">
                  Hukuktan siyasete , spordan magazine , sanattan bilime , astrolojiden yemeğe , animeden tiyatroya , Mars'tan Antik Mısır'a aklınıza gelebilecek her konuda , Sünni , Şii , Ateist , Deist , Alevi , Kürt , Ermeni , Yahudi veya Çerkes , kimliğiniz ve ırkınız hiç farketmeden istediğiniz ve hakkında yazabileceğinizi düşündüğünüz her kategoride yazabilirsiniz. Eleştirilere açık olmayı unutmayın ancak &#128516;  
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
