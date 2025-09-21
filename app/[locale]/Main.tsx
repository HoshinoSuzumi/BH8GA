"use client";

import { noto_sc, pacifico, rubik, saira } from "@/app/[locale]/fonts";
import TablerCards from "@/components/Icons/TablerCards";
import { ContactCard } from "@/app/[locale]/ContactCard";
import TablerBrandGithub from "@/components/Icons/TablerBrandGithub";
import TablerBrandBilibili from "@/components/Icons/TablerBrandBilibili";
import TablerBrandSteam from "@/components/Icons/TablerBrandSteam";
import TablerBrandTelegram from "@/components/Icons/TablerBrandTelegram";
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@/navigation";
import { Image } from "@nextui-org/image";
import dayjs from "@/app/dayjs";
import { useTranslations } from "next-intl";
import { CardDesign } from "@/app/actions/types";
import { fetchCardDesigns } from "@/app/actions/card";
import { ReactNode, useEffect, useRef, useState } from "react";
import Hero from "@/components/Hero";
import { Post } from "@/app/actions/posts";
import TablerBrain from "@/components/Icons/TablerBrain";
import { PostItem } from "@/components/PostItem";
import { SectionBlock } from "@/components/SectionBlock";
import { Footer } from "@/components/Footer";
import TablerBrandMastodon from "@/components/Icons/TablerBrandMastodon";
import mapboxgl, { FillLayer } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  AttributionControl,
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  useMap,
} from "react-map-gl";
import TablerLivePhoto from "@/components/Icons/TablerLivePhoto";

const FloatCard = ({
  label,
  content,
  icon,
  className,
  href,
}: {
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  className?: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className={`block px-4 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 bg-gradient-to-br from-primary-600 to-purple-600 overflow-hidden relative group cursor-pointer ${className}`}
    >
      <div
        className={
          "absolute -inset-0.5 group-hover:inset-[1px] transition-all bg-neutral-100 dark:bg-neutral-800 opacity-80 group-hover:opacity-75 backdrop-blur-md rounded-lg group-hover:rounded-[7px]"
        }
      ></div>
      <div className={"flex flex-col justify-between gap-3 pr-16 relative"}>
        <h1
          className={`text-primary-800 text-xs font-bold opacity-70 ${saira.className}`}
        >
          {label}
        </h1>
        <h2 className={`text-lg font-medium ${saira.className}`}>{content}</h2>
        {icon}
      </div>
    </Link>
  );
};

export default function Main({
  posts,
  params: { locale },
}: {
  posts: Post[];
  params: { locale: string };
}) {
  const t = useTranslations("home");
  const [cards, setCards] = useState<CardDesign[]>();

  useEffect(() => {
    fetchCardDesigns().then(setCards);
  }, []);

  const [mapZoom, setMapZoom] = useState(2.82);

  const GeoJSON: {
    type: string;
    features: {
      type: string;
      properties: {
        message: string;
        imageId: number;
        iconSize: number[];
      };
      geometry: {
        type: string;
        coordinates: [number, number];
      };
    }[];
  } = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          message: "Foo",
          imageId: 1011,
          iconSize: [60, 60],
        },
        geometry: {
          type: "Point",
          coordinates: [106.5713, 29.563],
        },
      },
    ],
  };

  return (
    <main className="min-h-screen py-16 relative">
      <Hero
        title={
          <h1
            className={`text-6xl font-bold drop-shadow-lg ${saira.className}`}
          >
            <span className={"text-neutral-600 dark:text-neutral-200"}>
              BH8
            </span>
            <span className={"text-amber-400"}>GA</span>
          </h1>
        }
        subtitle={
          <h2 className={`text-sm font-bold mt-1 ${saira.className}`}>
            <span className={"text-neutral-400"}>ITU 43 | CQ 24 | OL39</span>
          </h2>
        }
      />
      <div
        className={`container max-w-[762px] p-4 md:p-0 md:pt-8 space-y-12 ${noto_sc.className}`}
      >
        <SectionBlock title={t("about", { callsign: "Timothy Yin" })}>
          <article>
            <FloatCard
              href={"/gallery"}
              className={"mb-4 md:float-end md:ml-6 md:mb-2"}
              label={t("my_qsl_faces")}
              content={
                <>
                  {t("my_qsl_count", {
                    count:
                      cards?.filter((card) => card.status !== "disabled")
                        .length || "-",
                  })}
                </>
              }
              icon={
                <TablerCards
                  className={
                    "absolute -right-1 bottom-0.5 text-primary-800 text-5xl opacity-25"
                  }
                />
              }
            />
            <p
              className={`indent-6 text-sm leading-6 text-neutral-700 dark:text-neutral-400 text-justify ${saira.className}`}
            >
              这里是 <b className={rubik.className}>Timothy Yin</b>（呼号{" "}
              <b className={`text-primary-400`}>BH8GA</b>
              ），非常高兴能够与您在电波中
              <span className={`text-neutral-400 dark:text-neutral-500`}>
                或网络上
              </span>
              相遇！QTH 位于重庆 (
              <span className={"text-primary-400"}>OL39</span>
              )，一座美丽的山城。我是一名独立前端开发者（在校），开发了一些有趣的东西，喜欢
              <b>业余无线电</b>通信。目前在维护&nbsp;
              <a
                className={"font-bold text-primary-400"}
                href="https://ham-dev.c5r.app/"
              >
                HAM set
              </a>
              、
              <a
                className={"font-bold text-primary-400"}
                href="https://ctfever.uniiem.com/"
              >
                CTFever
              </a>
              ，
              这两个项目都是在线工具类网站，前者是一个业余无线电工具箱，包含字母解释法速查、考试题库、卫星数据库和梅登黑德网格定位等功能；后者是为网络安全夺旗赛开发的一站式工具箱。
              我贯彻{" "}
              <span className={`${pacifico.className}`}>get hands dirty</span>
              &nbsp;的思想，热爱将脑子里的灵光一现变为现实。当你想做一件事情的时候，那就立刻放手去做，不要受制于各种“先决条件”：当你想要阅读一本书，就立刻打开书开始阅读，不要泡好一杯咖啡、洗好一盘水果再开始；
              当你想到一个
              idea，就立刻打开电脑尝试实现，不要先去学习各种技术、先去了解各种知识再开始。
              <b>永远不要等到你的热情开始消退之时再开始行动。</b>
              {locale !== "zh" ? (
                <span className={"font-bold opacity-50"}>
                  (Only available in Chinese)
                </span>
              ) : null}
            </p>
          </article>
        </SectionBlock>

        <SectionBlock title={t("find_me")}>
          <div className={"grid grid-cols-2 md:grid-cols-4 gap-4"}>
            <ContactCard
              title={"GitHub"}
              content={"HoshinoSuzumi"}
              href={"https://github.com/HoshinoSuzumi"}
              icon={
                <TablerBrandGithub
                  className={
                    "absolute -right-1 bottom-0 text-primary-800 text-5xl opacity-25"
                  }
                />
              }
            />
            <ContactCard
              notoFont
              title={t("bilibili")}
              content={"星野鈴美"}
              href={"https://space.bilibili.com/158985588"}
              icon={
                <TablerBrandBilibili
                  className={
                    "absolute -right-1 bottom-0 text-primary-800 text-5xl opacity-25"
                  }
                />
              }
            />
            <ContactCard
              title={"Steam"}
              content={"Hoshino_suzumi"}
              href={"https://steamcommunity.com/id/Hoshino_suzumi/"}
              icon={
                <TablerBrandSteam
                  className={
                    "absolute -right-1 bottom-0 text-primary-800 text-5xl opacity-25"
                  }
                />
              }
            />
            {/* <ContactCard
              title={"Telegram"}
              content={"@Hoshino_suzumi"}
              href={"https://t.me/Hoshino_suzumi"}
              icon={
                <TablerBrandTelegram
                  className={
                    "absolute -right-1 bottom-0 text-primary-800 text-5xl opacity-25"
                  }
                />
              }
            /> */}
            <ContactCard
              title={"Chronoframe"}
              content={"Gallery"}
              href={"https://lens.bh8.ga"}
              icon={
                <TablerLivePhoto
                  className={
                    "absolute -right-1 bottom-0 text-primary-800 text-5xl opacity-25"
                  }
                />
              }
            />
          </div>
        </SectionBlock>

        <SectionBlock title={t("works")}>
          <div className={"grid grid-cols-12 grid-rows-2 gap-4"}>
            <Card className={`col-span-12 sm:col-span-5 ${saira.className}`}>
              <CardHeader className="justify-between">
                <div className="flex gap-4">
                  <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src="/avatar.jpg"
                  />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      Timothy Yin
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400 leading-none">
                      HoshinoSuzumi
                    </h5>
                  </div>
                </div>
                <Button
                  startContent={
                    <TablerBrandGithub className={"text-base opacity-60"} />
                  }
                  className={
                    "bg-transparent text-foreground border-default-200"
                  }
                  color="primary"
                  radius="full"
                  size="sm"
                  variant={"bordered"}
                  as={Link}
                  href={"https://github.com/HoshinoSuzumi"}
                  target={"_blank"}
                >
                  Follow
                </Button>
              </CardHeader>
              <CardBody className="px-3 py-0 pb-2 text-xs text-default-400 text-justify overflow-hidden">
                <p>{t("proj.me")}</p>
              </CardBody>
            </Card>

            <Card
              isFooterBlurred
              className={`w-full h-full col-span-12 sm:col-span-7 ${saira.className}`}
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  {t("proj.ctfever.title1")}
                </p>
                <h4 className="text-white/90 font-medium text-xl">
                  {t("proj.ctfever.title2")}
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="CTFever app background"
                className="z-0 w-full aspect-[16/9] sm:aspect-[16/7] object-cover"
                src="/works/ctfever_bg.jpg"
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <Image
                    alt="CTFever app icon"
                    className="w-10 h-10"
                    src="/works/ctfever_icon.png"
                  />
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/80 font-medium">
                      {t("proj.ctfever.name")}
                    </p>
                    <p className="text-tiny text-white/60">
                      {t("proj.ctfever.desc")}
                    </p>
                  </div>
                </div>
                <Button
                  color={"primary"}
                  className={`${noto_sc.className}`}
                  radius="sm"
                  size="sm"
                  as={Link}
                  href={"https://c5r.app/"}
                  target={"_blank"}
                >
                  {t("proj.try_it")}
                </Button>
              </CardFooter>
            </Card>

            <Card
              isFooterBlurred
              className={`w-full h-full col-span-12 sm:col-span-7 ${saira.className}`}
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  {t("proj.hamset.title1")}
                </p>
                <h4 className="text-white/90 font-medium text-xl">
                  {t("proj.hamset.title2")}
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="HAM-set app background"
                className="z-0 w-full aspect-[16/9] sm:aspect-[16/7] object-cover"
                src="/works/hamset_bg.jpg"
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/80 font-medium">
                      {t("proj.hamset.name")}
                    </p>
                    <p className="text-tiny text-white/60">
                      {t("proj.hamset.desc")}
                    </p>
                  </div>
                </div>
                <Button
                  color={"primary"}
                  className={`${noto_sc.className}`}
                  radius="sm"
                  size="sm"
                  as={Link}
                  href={"https://ham-dev.c5r.app/"}
                  target={"_blank"}
                >
                  {t("proj.try_it")}
                </Button>
              </CardFooter>
            </Card>

            <Card
              isFooterBlurred
              className={`w-full h-full col-span-12 sm:col-span-5 ${saira.className}`}
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  {t("proj.rayui.title1")}
                </p>
                <h4 className="text-white/90 font-medium text-xl">
                  {t("proj.rayui.title2")}
                </h4>
              </CardHeader>
              <div className="w-full h-full pattern bg-neutral-900"></div>
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/80 font-medium">
                      {t("proj.rayui.name")}
                    </p>
                    <p className="text-tiny text-white/60">
                      {t("proj.rayui.desc")}
                    </p>
                  </div>
                </div>
                <Button
                  color={"primary"}
                  className={`${noto_sc.className}`}
                  radius="sm"
                  size="sm"
                  as={Link}
                  href={"https://rayui.uniiem.com/"}
                  target={"_blank"}
                >
                  {t("proj.try_it")}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </SectionBlock>

        {/* <SectionBlock title={`${t("footprint")}`}>
          <Map
            mapboxAccessToken="pk.eyJ1IjoiaG9zaGlub3N1enVtaSIsImEiOiJjbHpnMGM3bjExOTJkMmxyeWptYTlrb2tsIn0.0_TJA2LssPSTRf4GxC42ww"
            initialViewState={{
              longitude: 106.5713,
              latitude: 29.563,
              zoom: mapZoom,
            }}
            style={{
              width: "100%",
              aspectRatio: "16/9",
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "rgba(0,0,0,0.1)",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
            projection={{ name: "globe" }}
            mapStyle="mapbox://styles/hoshinosuzumi/cm47bhusy016x01sdamot86mf"
            attributionControl={false}
            antialias
            onZoom={(e) => {
              setMapZoom(e.target.getZoom());
            }}
          >
            <GeolocateControl position="bottom-right" />
            <NavigationControl position="bottom-right" />
            {GeoJSON.features.map((marker, index) => (
              <Marker
                key={index}
                longitude={marker.geometry.coordinates[0]}
                latitude={marker.geometry.coordinates[1]}
              >
                <div
                  className="p-1 rounded-full cursor-pointer"
                  onClick={() => window.alert(`${marker.geometry.coordinates}`)}
                >
                  {mapZoom >= 6.5 ? (
                    <div className={"p-2 bg-white rounded-lg shadow-lg"}>
                      <Image
                        alt={marker.properties.message}
                        src={`https://picsum.photos/id/${marker.properties.imageId}/${marker.properties.iconSize[0]}/${marker.properties.iconSize[1]}`}
                        style={{
                          width: `${marker.properties.iconSize[0]}px`,
                          height: `${marker.properties.iconSize[1]}px`,
                          backgroundSize: "100%",
                          display: "block",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-blue-400 ring-2 ring-white shadow-xl"></div>
                  )}
                </div>
              </Marker>
            ))}
          </Map>
        </SectionBlock> */}

        <SectionBlock title={t("blog.title")}>
          <ul className={`w-full ${noto_sc.className}`}>
            {posts.map((post, index) => (
              <PostItem
                classNames={"fade-up-in"}
                style={{ animationDelay: `${index * 200}ms` }}
                post={post}
                key={index}
                isExternal={post.external}
              />
            ))}
          </ul>
        </SectionBlock>

        <SectionBlock title={t("recently_songs")}>
          <iframe
            allow="autoplay *; encrypted-media *;"
            frameBorder="0"
            height="450"
            className="w-full overflow-hidden bg-transparent rounded-2xl"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src="https://embed.music.apple.com/cn/playlist/%E5%96%9C%E7%88%B1%E7%9A%84%E6%AD%8C%E6%9B%B2/pl.u-m6UzgB883a"
          ></iframe>
        </SectionBlock>

        <Footer />
      </div>
    </main>
  );
}
