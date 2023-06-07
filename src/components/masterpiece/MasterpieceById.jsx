import React from "react";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import { Stack, Tooltip, useTheme } from "@mui/material";
import { parseHtmlText } from "../../utils/htmlParseConfig";
import { BiShoppingBag, BiShow } from "react-icons/bi";

const MasterpieceById = ({ data }) => {
  const theme = useTheme();
  const imageUrl = data?.image && `${BASE_URL}${photosApiUrl}/${data?.image}`;

  return (
    <Stack spacing={4} sx={{ p: { xs: 0.5, md: 1.5 } }}>
      <h2 className="heading-secondary p-padding-top-medium">{data.title}</h2>

      <img
        src={imageUrl}
        alt="masterpiece img"
        style={{ maxWidth: "100%", height: "auto" }}
      />

      <p className="paragraph--parsed">
        {data?.info
          ? parseHtmlText(data.info)
          : "Tanıtım metni henüz eklenmemiştir."}
      </p>

      <Stack
        direction="row"
        justifyContent="space-around"
        textAlign="center"
        alignItems="center"
      >
        <Stack spacing={1}>
          <h4 className="heading-tertiary">{data?.owner}</h4>
          <Stack direction="row" justifyContent="center" spacing={3}>
            {data?.showLink && (
              <Tooltip title="Erişim Linki 1">
                <a href={data?.showLink}>
                  <BiShow size={15} color={theme.palette.primary.dark} />
                </a>
              </Tooltip>
            )}
            {data?.showLink2 && (
              <Tooltip title="Erişim Linki 2">
                <a href={data?.showLink2}>
                  <BiShow size={15} color={theme.palette.primary.dark} />
                </a>
              </Tooltip>
            )}
            {data?.marketLink && (
              <Tooltip title="Satın Alma Linki">
                <a href={data?.marketLink}>
                  <BiShoppingBag size={15} color={theme.palette.primary.dark} />
                </a>
              </Tooltip>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MasterpieceById;
