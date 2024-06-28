export function isDoubleStepEntity({
    sourceType,
    subSetType,
}: {
    sourceType: string;
    subSetType?: string;
}) {
    switch (sourceType) {
        case "youtube":
            if (subSetType === "account") return true;
            break;

        case "twitter":
            if (
                subSetType === "hashtag" ||
                subSetType === "profile"
            )
                return true;
            break;

        case "medium":
            if (subSetType === "account") return true;
            break;

        case "news":
            if (subSetType === "keyword") return true;
            break;

        default:
            return false;
    }
    return false;
}

export function getEntityAddModalProps({
  sourceType,
  subSetType,
}: {
  sourceType: string;
  subSetType?: string;
}) {
  switch (sourceType) {
    case "youtube":
      if (subSetType === "account")
        return {
          placeholderURL: "https://www.youtube.com/@",
          validationMessage:
            "Input only the username without special characters.",
          placeholder: "Input a valid Youtube Account. Example: 'TED'.",
          getCleanValue: (value: string) => {
            const replaceableStrings = [
              "https://www.youtube.com/@",
              "https://youtube.com/@",
              "@",
            ];
            for (const domain of replaceableStrings) {
              if (value.startsWith(domain)) {
                return value.replace(domain, "");
              }
            }
            return value.trim();
          },
        };
      if (subSetType === "video")
        return {
          placeholderURL: "https://www.youtube.com/watch?v=",
          validationMessage:
            "Input only the video id after 'watch?v=' without special characters.",
          placeholder: "Input a valid ID of the video",
          getCleanValue: (value: string) => {
            const regExp =
              /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match: RegExpMatchArray | null = value.match(regExp);
            return match && match[7]?.length === 11 ? match[7] : value.trim();
          },
        };
      break;

    case "twitter":
      if (subSetType === "tweet" || subSetType === "thread")
        return {
          placeholderURL: "https://www.twitter.com/",
          validationMessage:
            "Input a valid status URL containing username/status/tweet_id.",
          placeholder:
            "Input a valid URL containing username/status/tweet_id. Example: 'KnowleeAI/status/1731966064123322504'.",
          getCleanValue: (value: string) => {
            // Remove the protocol and domain
            const withoutDomain = value.replace(
              /^https?:\/\/(?:www\.)?twitter\.com\//,
              ""
            );

            // Remove underscores from the username
            const withoutUnderscores = withoutDomain.replace(/([^\/]*)/, (match) => match.replace(/_/g, ''));

            // Extract username, status word, and status id
            const regex = /^([A-Za-z0-9_\-]+)\/status\/(\d+)$/;
            const match = withoutUnderscores.match(regex);

            if (match) {
              const username = match[1];
              const statusWord = "status"; // This will always be 'status' in a Twitter URL
              const statusId = match[2];

              return `${username}/${statusWord}/${statusId}`;
            }

            return value.trim();
          },
        };

      if (subSetType === "profile")
        return {
          placeholderURL: "https://www.twitter.com/",
          validationMessage:
            "Input only the username without special characters.",
          placeholder: "Input a valid username. Example: 'KnowleeAI'.",
          getCleanValue: (value: string) => {
            const replaceableStrings = [
              "https://www.twitter.com/",
              "https://twitter.com/",
            ];
            for (const domain of replaceableStrings) {
              if (value.startsWith(domain)) {
                return value.replace(domain, "");
              }
            }
            return value.trim();
          },
        };
      if (subSetType === "hashtag")
        return {
          placeholderURL: "https://www.twitter.com/hashtag/",
          validationMessage:
            "Input only the hashtag without special characters.",
          placeholder: "Input a valid hashtag. Example: 'bitcoin'",
          getCleanValue: (value: string) => {
            const replaceableStrings = [
              "https://www.twitter.com/hashtag/",
              "https://twitter.com/hashtag/",
              "#"
            ];
            for (const domain of replaceableStrings) {
              if (value.startsWith(domain)) {
                return value.replace(domain, "");
              }
            }
            return value.trim();
          },
        };
      break;

    case "medium":
      if (subSetType === "account")
        return {
          placeholderURL: "https://www.medium.com/@",
          validationMessage:
            "Input only the username without special characters.",
          placeholder: "Input a valid username. Example: 'knowlee.ai'.",
          getCleanValue: (value: string) => {
            const replaceableStrings = [
              "https://www.medium.com/@",
              "https://medium.com/@",
              "@",
            ];
            for (const domain of replaceableStrings) {
              if (value.startsWith(domain)) {
                return value.replace(domain, "");
              }
            }
            return value.trim();
          },
        };

      if (subSetType === "article")
        return {
          placeholderURL: "https://www.medium.com/",
          validationMessage: "Input only the username and its article id.",
          placeholder:
            "Input a valid username and its article. Example: 'arcturusmag/talking-to-you-a8508960d804'.",
          getCleanValue: (value: string) => {
            const replaceableStrings = [
              "https://www.medium.com/",
              "https://medium.com/",
            ];
            for (const domain of replaceableStrings) {
              if (value.startsWith(domain)) {
                return value.replace(domain, "");
              }
            }
            return value.trim();
          },
        };
      break;

    case "news":
      if (subSetType === "keyword")
        return {
          placeholderURL: "",
          validationMessage: "Input only the keywords. No URLs.",
          placeholder: "Input a keyword. Example: 'bitcoin'.",
          getCleanValue: (value: string) => value.trim(),
        };
      if (subSetType === "url")
        return {
          placeholderURL: "",
          validationMessage: "Input the news webpage link.",
          placeholder:
            "Input a valid news article. Example: 'https://www.theverge.com/2023/12/1/23984497/openai-gpt-store-delayed-ai-gpt'.",
          getCleanValue: (value: string) => value.trim(),
        };
      break;

    case "pdf":
      return {
        placeholderURL: "",
        validationMessage: "Your link must end with '.pdf'.",
        placeholder:
          "Input a valid PDF url. Example: 'https://bitcoin.org/bitcoin.pdf'.",
        getCleanValue: (value: string) => value.trim(),
      };

    case "url":
      return {
        placeholderURL: "",
        validationMessage: "Input a valid URL.",
        placeholder:
          "Input a valid URL. Example: 'https://openai.com/pricing'.",
        getCleanValue: (value: string) => value.trim(),
      };

    case "coda":
      return {
        placeholderURL: "https://www.coda.io/@",
        validationMessage: "Input the username and its related webpage.",
        placeholder:
          "Input a valid Coda account and its page note. Example: 'evanatcoda/meetings-notes'.",
        getCleanValue: (value: string) => {
          const replaceableStrings = ["https://www.coda.io/@", "https://coda.io/@"];
          for (const domain of replaceableStrings) {
            if (value.startsWith(domain)) {
              return value.replace(domain, "");
            }
          }
          return value.trim();
        },
      };
    
    case "reddit":
      return {
        placeholderURL: "https://www.reddit.com/",
        validationMessage: "Input the reddit url.",
        placeholder:
          "Input a valid Reddit url. Example: 'r/AIAssisted/comments/18e5pie/things_you_might_expect_to_take_a_star_trek'.",
        getCleanValue: (value: string) => {
          const replaceableStrings = ["https://www.reddit.com/", "https://reddit.com/"];
          for (const domain of replaceableStrings) {
            if (value.startsWith(domain)) {
              return value.replace(domain, "");
            }
          }
          return value.trim();
        },
      };
    
    case "openai":
      return {
        placeholderURL: "https://chat.openai.com/share/",
        validationMessage: "Input the ChatGPT chat link.",
        placeholder:
          "Input a valid ChatGPT conversation. Example: '0c97e9a7-9e60-48f5-876b-ab72ce23234d'.",
        getCleanValue: (value: string) => {
          const replaceableStrings = ["https://chat.openai.com/share/"];
          for (const domain of replaceableStrings) {
            if (value.startsWith(domain)) {
              return value.replace(domain, "");
            }
          }
          return value.trim();
        },
      };
 
    case "bubblemaps":
      return {
        placeholderURL: "",
        validationMessage: "Input the token.",
        placeholder:
          "Token. Example: '0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'.",
        getCleanValue: (value: string) => {
          const regex = /\/([^\/]+)$/;
          const match = value.match(regex);
          if (match && match[1]) {
              return match[1];
          } else {
            return value.trim();
          }
        },
      };

    default:
      return {
        placeholderURL: "",
        validationMessage: "Please enter valid URL",
        placeholder: "Input a valid URL",
        getCleanValue: (value: string) => value.trim(),
      };
  }
  return {
    placeholderURL: "",
    validationMessage: "Please enter valid URL",
    placeholder: "Input a valid URL",
    getCleanValue: (value: string) => value.trim(),
  };
}
