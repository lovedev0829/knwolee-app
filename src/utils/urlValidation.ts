export const validateTwitterUrl = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)" + // protocol
      "((www|mobile)\\.)?" + // sub-domain
      "(twitter\\.com|x\\.com)" + // domain name (twitter.com or x.com)
      "(\\/[A-Za-z0-9\\_\\-]+)*" + // route
      "(\\?.*)?$" // optional query parameters starting with '?'
  );
  return !!pattern.test(url);
};


export const validateYoutubeUrl = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\/\/)?" + // protocol
      "(www\.)?" + // www
      "youtube\.com" + // domain name
      "(\/watch\\?v=[A-Za-z0-9\\-_]+)?" + // video ID
      "|(\/@[A-Za-z0-9\\-_]+)?$" // account username
  );
  return !!pattern.test(url);
};

export const validateYoutubeVideoId = (url: string) => {
  const pattern = new RegExp(
    "^[a-zA-Z0-9_-]{11}$" 
  );
  return !!pattern.test(url);
};


export const validateMediumUrl = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\/\/)?" + // protocol
      "((www|mobile)\.)?" + // sub-domain
      "medium\.com" + // domain name
      "(\/@[A-Za-z0-9\\-_\.]+)?" + // username with @ symbol, allowing underscore and dot
      "(\/[A-Za-z0-9\\-]+)*\/?$" // slug
  );
  return !!pattern.test(url);
};

export const validateMediumWithOptionalUsername = (url: string) => {
  const pattern = new RegExp("^(https?:\/\/)?((www|mobile)\.)?medium\.com(\/@[A-Za-z0-9\\-_\.]+)?(\/[A-Za-z0-9\\-]+)+\/?$"
  );
  return !!pattern.test(url);
};

export const validateMediumProfile = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\/\/)?" + // protocol
      "((www|mobile)\.)?" + // sub-domain
      "medium\.com" + // domain name
      "(\/@[A-Za-z0-9\\-_\.]+)" // username with @ symbol, allowing underscore and dot
  );
  return !!pattern.test(url);
};

export const validatePDFUrl = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\/\/)?" + // protocol
      "([A-Za-z0-9.-]+\.[A-Za-z]{2,})" + // domain name and TLD
      "(\/[A-Za-z0-9@:%_+~#=\/.-]*)*" + // path
      "\.pdf$" // must end with .pdf
  );
  return !!pattern.test(url);
};

export const validateNewsUrl = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\/\/)?" + // protocol
      "([A-Za-z0-9.-]+\.[A-Za-z]{2,})" + // domain name and TLD
      "(\/[A-Za-z0-9@:%_+~#=\/.-]*)*" // path
  );
  return !!pattern.test(url);
};

export const validateUrl = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\/\/)?" + // protocol
      "(www\.)?" // www
  );
  return !!pattern.test(url);
};

export const validateCodaUrl = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\/\/)?" + // protocol
      "((www|mobile)\.)?" + // sub-domain
      "coda\.io" + // domain name
      "(\/@[A-Za-z0-9\\-_\.]+)?" + // username with @ symbol, allowing underscore and dot
      "(\/[A-Za-z0-9\\-]+)*\/?$" // slug
  );
  return !!pattern.test(url);
};

export const validateArtemisUrl = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\/\/)?" + // protocol
      "(www\.)?" + // www
      "youtube\.com" + // domain name
      "(\/watch\\?v=[A-Za-z0-9\\-_]+)?" + // video ID
      "|(\/@[A-Za-z0-9\\-_]+)?$" // account username
  );
  return !!pattern.test(url);
};

export const validateBubblemapsUrl = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\/\/)?" + // protocol
      "(www\.)?" + // www
      "youtube\.com" + // domain name
      "(\/watch\\?v=[A-Za-z0-9\\-_]+)?" + // video ID
      "|(\/@[A-Za-z0-9\\-_]+)?$" // account username
  );
  return !!pattern.test(url);
};


export const validateTwitterThreadOrTweet = (url: string) => {
  const pattern = new RegExp(
    "/^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{3,14}$/"
  );
  return !!pattern.test(url) && url.includes("status");
};

export const validateAlphanumericWithNoSlash = (url: string) => {
  const pattern = new RegExp(
    "^(?!.*\/)[a-zA-Z0-9]+$" 
  );
  return !!pattern.test(url);
};

export const validateYoutubeAccountUsername = (username: string) => {
  const pattern = new RegExp(
    "^(?!.*\/)[a-zA-Z0-9-]+$" 
  );
  return !!pattern.test(username);
};

export const validateAlphanumericWithSlash = (url: string) => {
  const pattern = new RegExp(
    "^[a-zA-Z0-9/]+$" 
  );
  return !!pattern.test(url);
};

export const validateCommonURLCharsWithSlash = (url: string) => {
  const pattern = new RegExp(
    "^[a-zA-Z0-9/_]+$" 
  );
  return !!pattern.test(url);
};

export const validateCommonURLCharsWithoutSlash = (url: string) => {
  const pattern = new RegExp(
    "^[a-zA-Z0-9_]+$" 
  );
  return !!pattern.test(url);
};


export const validateHastag = (url: string) => {
  const pattern = new RegExp(
    "/^#[a-zA-Z0-9_]+$/" 
  );
  return !!pattern.test(url);
};


export const validateMediumProfileUsername = (url: string) => {
  const pattern = new RegExp("/^[a-zA-Z0-9.]+$/");
  return !!pattern.test(url);
};

export const validateMediumArticle = (url: string) => {
const pattern = new RegExp(
      "(\/@[A-Za-z0-9\\-_\.]+)?" + // username with @ symbol, allowing underscore and dot
      "(\/[A-Za-z0-9\\-]+)*\/?$" // slug
  );  return !!pattern.test(url);
};

export const validateNewsKeyword = (keyword: string) => {
  const pattern = new RegExp(
    "^[a-zA-Z0-9/ ]+$" // Added a space inside the character set
  );
  return !!pattern.test(keyword) && !['https:', 'http:', 'www.', '.com'].includes(keyword);
};

export const validatePdfUrl = (url: string) => {
  const pattern = /\.pdf$/i;
  return pattern.test(url);
};

export const validateUrlWithProtocol = (url: string) => {
  const pattern = /^(https?:\/\/)/i;
  return pattern.test(url);
};

export const validateCodaNotes = (url: string) => {
  const pattern = new RegExp("^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$");
  return !!pattern.test(url) && url.includes("/");
};

export const validateOpenAIChat = (url: string) => {
  const pattern = new RegExp(
    "^[a-zA-Z0-9-]+$" 
  );
  return !!pattern.test(url);
};
