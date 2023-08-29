import React from "react";
import Head from "next/head";

interface SeoProps {
  title?: string;
  description: string;
  url: string;
  image_url?: string;
}

export function Seo(props: SeoProps) {
  const domain = "https://fashional.pro/";
  const { title, description, url, image_url } = props;
  return (
    <Head>
      <title>{title ? title + " " + "| Lil Shop" : "Lil Shop"}</title>
      <meta name="title" content={title + "| Lil Shop"} />
      <meta name="description" content={description} />
      <meta name="keywords" content="Lil Shop lil shop " />
      <meta name="author" content="Lil Shop" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${domain}${url}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image_url ?? ""} />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${domain}${url}`} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image_url ?? ""}></meta>
      <meta
        name="zalo-platform-site-verification"
        content="GVA5Ex_P5M5Dsi8zkwvrCJsAvYNHz3TuDJG"
      />
    </Head>
  );
}
