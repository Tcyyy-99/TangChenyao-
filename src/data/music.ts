
export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string; // 本地路径，如 "/music/covers/cover1.jpg"
  audio: string; // 本地路径，如 "/music/audio/song1.mp3"
}

/**
 * 🎵 全本地音乐数据库配置说明 / Local Music Database Guide:
 * 
 * 1. 文件存放 (File Storage):
 *    - 请将音频文件放入: /public/music/audio/
 *    - 请将封面图片放入: /public/music/covers/
 * 
 * 2. 引用方式 (Referencing):
 *    - 必须使用以 "/" 开头的绝对路径（相对于 public 目录）
 */
export const MUSIC_PLAYLIST: Song[] = [
  {
    id: "local-01",
    title: "drive me wild",
    artist: "Garoad",
    cover: "/music/covers/cover1.png",
    audio: "/music/audio/Garoad - drive me wild.mp3"
  },
  {
    id: "local-02",
    title: "every day is night",
    artist: "Garoad",
    cover: "/music/covers/cover2.png", 
    audio: "/music/audio/Garoad - every day is night.mp3"
  },
  {
    id: "local-03",
    title: "Hopes And Dreams",
    artist: "Garoad",
    cover: "/music/covers/cover3.png",
    audio: "/music/audio/Garoad - Hopes And Dreams.mp3"
  },
  {
    id: "local-04",
    title: "nightime maneuvers",
    artist: "Garoad",
    cover: "/music/covers/cover4.png",
    audio: "/music/audio/Garoad - nightime maneuvers.mp3"
  },
];
