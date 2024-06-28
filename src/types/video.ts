interface videoRenderProps {
  audio: {
    video_volume: number;
    audio_id: string;
    audio_library: string;
    src: string;
    track_volume: number;
    tts: string;
  }

   output: {
    name: string;
    description: string;
    format: string;
    title: string;
    height: number;
    width: number;
  }

  scenes: {
    background: Background;
    time: number;
    keywords: any[];
    sub_scenes: SubScene[];
    music: boolean;
    tts: boolean;
    subtitle: boolean;
    subtitles: Subtitle[];
  }
}

interface Background {
  src: Src[];
  color: string;
  bg_animation: BgAnimation;
}

interface BgAnimation {
  animation: string;
}

interface Src {
  url: string;
  asset_id: number;
  type: string;
  library: string;
  mode: string;
  frame: null;
  loop_video: boolean;
  mute: boolean;
  resource_id: number;
  sessionId: string;
}

interface SubScene {
  time: number;
  location: Location;
  displayItems: any[];
  text_lines: TextLine[];
  subtitle: string;
  showSceneNumber: string;
  font: Font;
}

interface Font {
  name: string;
  size: number;
  line_spacing: number;
  color: string;
  backcolor: string;
  keycolor: string;
  textShadowColor: string;
  textShadowWidthFr: number;
  line_height: number;
  case: null;
  decoration: any[];
  fullWidth: boolean;
}

interface Location {
  start_x: number;
  start_y: number;
}

interface TextLine {
  text: string;
  text_animation: TextAnimation[];
  text_bg_animation: TextAnimation[];
}

interface TextAnimation {
  animation: string;
  source: string;
  speed: number;
  type: string;
}

interface Subtitle {
  text: string;
  time: number;
}