import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_PLAY_HT_KEY as string;
const USER_ID = import.meta.env.VITE_APP_PLAY_HT_USER_ID as string;
const VOICE = import.meta.env.VITE_APP_PLAY_HT_VOICE as string;
const API_URL = import.meta.env.VITE_APP_PLAY_HT_API_URL as string;

interface CreateAudioResponse {
  status: string;
  transcriptionId: string;
  contentLength: number;
  wordCount: number;
}

interface GetAudioResponse {
  voice: string;
  converted: boolean;
  audioDuration: number;
  audioUrl: string;
  message: string;
}

export const createAudio = async (text: string) => {

  //console.log("Generating audio with text: ", text);

  try {
    const url = `${API_URL}/convert`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        AUTHORIZATION: API_KEY,
        "X-USER-ID": USER_ID,
      },
      body: JSON.stringify({ content: [text], voice: VOICE }),
    };

    const response = await fetch(url, options);
    const responseJSON: CreateAudioResponse = await response.json() as CreateAudioResponse;
    //console.log("Create audio response:", responseJSON);
    return responseJSON.transcriptionId;
  } catch (error) {
    //console.log(error);
  }
};

export const getAudio = async (audioId: string) => {

  //console.log("Getting audio ID: ", audioId);
  try {
    const url = `${API_URL}/articleStatus?transcriptionId=${audioId}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        AUTHORIZATION: API_KEY,
        "X-USER-ID": USER_ID,
      },
    };
    
    return new Promise<string>((resolve, reject) => {
      let timeElapsed = 0;
      const intervalTime = 1000;
      const timeout = 15;
      
      const interval = setInterval(async () => {
        timeElapsed += intervalTime / 1000;
        if (timeElapsed > timeout) {
          clearInterval(interval);
          reject(new Error("Timeout reached"));
          return;
        }
        
        try {
          const response = await fetch(url, options);
          const responseJSON: GetAudioResponse = await response.json() as GetAudioResponse;
          const audioUrl = responseJSON.audioUrl;
  
          if (audioUrl) {
            clearInterval(interval);
            resolve(audioUrl);
            return;
          }
        } catch (error) {
          clearInterval(interval);
          reject(error);
          return;
        }
      }, intervalTime);
    });
    
  } catch (error) {
    //console.log(error);
  }
};

interface Buffer {
  type: "buffer";
  data: number[];
}


export const playAudioFromBuffer = (buffer: Buffer) => {
  try {
    return new Promise((resolve) => {
      const bufferData = buffer.data;
      const audioBuffer = new Uint8Array(bufferData);

      // Now, you can use the audioBuffer to create an ArrayBuffer
      const arrayBuffer = audioBuffer.buffer;
      const audioContext = new window.AudioContext();
      // 2. Decode the buffer
      const result = audioContext.decodeAudioData(arrayBuffer, (decodedData) => {
        // 3. Create an AudioBufferSourceNode
        const source = audioContext.createBufferSource();

        source.buffer = decodedData;

        source.connect(audioContext.destination);
        source.start(0);
      });

      resolve(result);
    });
  } catch (error) {
    //console.log(error);
  }
};

interface IUseSpeechDetectionEnds {
  onSpeechEnd: (text: string) => void;
}

export const useSpeechDetection = ({ onSpeechEnd }: IUseSpeechDetectionEnds) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
 
 
  const userDoneSpeakingHandler = (e: SpeechRecognitionEvent) => {
    const text = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
  
    if (e.results[0].isFinal) {
      //console.log(`Words caught from user '${text}'`)
      // Increase the delay time here (in milliseconds)
      const delayTime = 1500; // 1.5 seconds
      setTimeout(() => {
        onSpeechEnd(text);
      }, delayTime);
    }
  }

  useEffect(() => {
    let SpeechRecognitionInstance: (new () => SpeechRecognition) | null = null;

    if ("SpeechRecognition" in window) {
      SpeechRecognitionInstance = window.SpeechRecognition;
    } else if ("webkitSpeechRecognition" in window) {
      //console.log("webkitSpeechRecognition");
      // Check for the property using optional chaining
      SpeechRecognitionInstance = (window as { webkitSpeechRecognition: new () => SpeechRecognition }).webkitSpeechRecognition;
    } else {
      //console.log("Could not find SpeechRecognition");
    }
    
    if (!SpeechRecognitionInstance) {
      console.error("SpeechRecognitionInstance is not available.");
      return;
    }
    
    const recognition = new SpeechRecognitionInstance();
    recognition.addEventListener("result", userDoneSpeakingHandler);
    setRecognition(recognition);

    return () => {
      recognition.removeEventListener("result", userDoneSpeakingHandler);
      setRecognition(null);
    };
  }, []);

  return {
    recognition,
  };
};