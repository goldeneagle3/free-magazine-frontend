import { Divider, Stack } from "@mui/material";
import React from "react";
import {
  useGetTopMovieOfTheWeekQuery,
  useGetTopMusicOfTheWeekQuery,
  useGetTopPictureOfTheWeekQuery,
} from "../../features/masterpiece/masterpieceSlice";
import MainLoadingComp from "../loading/MainLoadingComp";
import SingleMasterpiece from "./SingleMasterpiece";
import { genres } from "../../utils/genres";

const ShowTopsOfMasterpiecesComp = () => {
  const boxStyle = { border: "1px solid #cccccc48", p: 1 };
  const { data: music, isLoading: isMscLdng } = useGetTopMusicOfTheWeekQuery();
  const { data: picture, isLoading: isPctrLdng } =
    useGetTopPictureOfTheWeekQuery();
  const { data: movie, isLoading: isMvLdng } = useGetTopMovieOfTheWeekQuery();

  return (
    <Stack sx={boxStyle} spacing={3}>
      {(isMscLdng || isPctrLdng || isMvLdng) && (
        <MainLoadingComp isLoading={isMscLdng || isPctrLdng || isMvLdng} />
      )}
      {music && (
        <SingleMasterpiece
          data={music}
          title="Haftanın Sesi"
          genre={genres.MUSIC}
        />
      )}
      {music && picture && <Divider />}
      {picture && (
        <SingleMasterpiece
          data={picture}
          title="Haftanın Tablosu"
          genre={genres.PICTURE}
        />
      )}
      {picture && movie && <Divider />}
      {movie && (
        <SingleMasterpiece
          data={movie}
          title="Haftanın Perdesi"
          genre={genres.MOVIE}
        />
      )}
    </Stack>
  );
};

export default ShowTopsOfMasterpiecesComp;
