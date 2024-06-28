import { ChakraTheme, ColorMode, extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  initialColorMode: "light",
  // useSystemColorMode: false,
  styles: {
    global: () => ({
      body: {
        bg: "",
        color: "",
      },
      "::-webkit-scrollbar": {
        width: "3px",
        height: "3px",
        marginRight: "10px",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "primary.50",
        borderRadius: "5px",
      },
      ".scroll-hover": {
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&:hover": {
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.50",
          },
          // "&::-webkit-scrollbar-track": {
          //   backgroundColor: (props: { colorMode: ColorMode; }) =>
          //     props.colorMode === "dark" ? "neutral.90" : "neutral.10",
          // },
        }
      }
    }),
  },
  fonts: {
    heading: `'Roboto', sans-serif;`,
    body: `'Roboto', sans-serif;`,
  },
  components: {
    MenuList: {
      baseStyle: {
        zIndex: 9999, // Your zIndex value
      },
    },
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: "0 0 0 0px rgba(0, 0, 0, 0.3)", // Softer shadow with a neutral color
          outline: "none", // Remove default outline
          transition: "box-shadow 0.2s ease-in-out", // Smooth transition for the shadow
        },
      },
    }
  },
  colors: {
    accents: {
      "01": "#D84C10",
      "02": "#8E55EA",
      "03": "#3E90F0",
      "04": "#8C6584",
      "05": "#DDA73F",
    },
    code: {
      "04": "#FF97E8"
    },
    icons: {
      youtube: "#F61C0D",
      twitter: "black",
      medium: "#311B92",
      facebook: "#ffffff",
      email: "#FFAB3F",
      pdf: "#E1574C",
      artemis: "#E1574C",
      bubblemaps: "#E1574C",
      csv: "#45B058",
      doc: "#2685FD",
      url: "#004D40",
      linkedin: "white",
      coda: "#f5c6c2",
      news: "#4285f4",
      request: "#E1574C",
      // Add new icons color here
      reddit: "#FF5700", // Example color for Reddit
      //telegram: "#FFFFFF", // Example color for Telegram
      discord: "#7289DA", // Example color for Discord
      financial_market: "#123123", // Example color
      github: "#ffffff", // Example color for GitHub
      gitbook: "#ffffff", // Example color for GitHub
      indeed: "#2164f3", // Example color for Indeed
      glassdoor: "#0CAA41", // Example color for Glassdoor
      googlejob: "#ffffff", // Example color for Google Job
      upwork: "#FFFFFF", // Example color for Upwork
      booking: "#003580", // Example color for Booking.com
      tripadvisor: "#34e0a1", // Example color for Tripadvisor
      airbnb: "#e0565b", // Example color for Airbnb
      hotels: "#ffffff", // Example color for Hotels.com
      ryanair: "#073590", // Example color for RyanAir
      skyscanner: "#007BC3", // Example color for SkyScanner
      easyjet: "#FF6600", // Example color for easyJet
      kickstarter: "#05CE78", // Example color for Kickstarter
      similarweb: "#ffffff", // Example color for SimilarWeb
      producthunt: "#ff6154", // Example color for Product Hunt
      amazon: "#ffffff", // Example color for Amazon
      alibaba: "#ffffff", // Example color for Alibaba
      aliexpress: "#E62E04", // Example color for Aliexpress
      temu: "#FF4500", // Example color for Temu
      openai:"#00A67E",
      opensea:"#0086FF",
      shopify: "#95BF47", // Example color for Shopify
      ebay: "#FFFFFF", // Example color for eBay
      etsy: "#F16521", // Example color for Etsy
      walmart: "#0071CE", // Example color for Walmart
      shein: "#FFC0CB", // Example color for Shein
      nike: "#ffffff", // Example color for Nike
      asos: "#000", // Example color for Asos
      zalando: "#FF6900", // Example color for Zalando
      decathlon: "#0082C3", // Example color for Decathlon
      bestbuy: "#ffffff", // Example color for BestBuy
      hackernews: "#FF6600", // Example color for Hacker News
      googlemaps: "#ffffff", // Example color for Google Maps
      tiktok: "#ffffff", // Example color for TikTok
      whatsapp: "#25D366", // Example color for WhatsApp
      metathreads: "#ffffff", // Example color for Meta Threads
      quora: "#B92B27", // Example color for Quora
      soccer_stats: "#29A329", // Example color for Soccer Stats
      //allrecipes: "#E50000", // Example color for AllRecipes
      eventbrite: "#F05537", // Example color for Eventbrite
      getyourguide: "#ffffff", // Example color for GetYourGuide
      //spotify: "#1DB954", // Example color for Spotify
      trustpilot: "#00B67A", // Example color for TrustPilot
    },
    primary: {
      "02": "#3FDD78",
      10: "#E7EFFE",
      20: "#B8D1FC",  // Interpolated between 10 and 30
      30: "#9FC1F9",
      40: "#7193F6",  // Interpolated between 30 and 50
      50: "#4386F4",
      60: "#0E64F1",
      70: "#0A4EBC",  // Interpolated between 60 and 80
      80: "#083C91",
    },
    secondary: {
      "02": "#FFECDC",  // Lightest shade, almost a tint
      10: "#FFDBB2",
      20: "#FFCB86",  // Interpolated between 10 and 30
      30: "#FFBC5B",
      40: "#FFAD32",  // Interpolated between 30 and 50
      50: "#FFAB3F",  // The base color you provided
      60: "#FF901E",
      70: "#E47C0C",  // Interpolated between 60 and 80
      80: "#C96700",  // Darker shade, leaning towards a shade
    },        
    neutral: {
      10: "#FEFEFE",
      15: "rgba(243, 245, 247, 0.50)",
      20: "#F2F2F3",
      30: "#E5E6E6",
      40: "#CACDCE",
      50: "#B0B3B5",
      60: "#6C7275",
      70: "#4A4D4F",
      80: "#313435",
      90: "#191A1A",
      100: "#0C0D0D",
      "01100": "#FEFEFE",
      "0415": "rgba(108, 114, 117, 0.15)",
      "02100": "#F3F5F7",
      "03100": "#E8ECEF",
      "04100": "#6C7275",
      "05100": "#343839",
      "06100": "#232627",
      "07100": "#141718",
    },
    delete: {
      50: "#ED5656",
      100: "#C81515",
    },
  },
});

interface CustomColorHues {
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
  100: string;
}

interface CustomColors {
  primary: CustomColorHues;
  neutral: CustomColorHues;
}

export interface Theme extends ChakraTheme {
  colors: ChakraTheme["colors"] & CustomColors;
}

// export type Theme = typeof theme & ChakraTheme;
