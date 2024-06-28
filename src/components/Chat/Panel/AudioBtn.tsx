
import React, { useState, useEffect } from 'react'
import { useOpenAITextToSpeechMutation } from 'src/api/mutations/openAIMutation';
import { createAudio, getAudio, playAudioFromBuffer } from 'src/utils/audio'
import { styled } from 'styled-components'

const Copy = styled.div`
  position: relative;
  line-height: 20px;
  cursor: pointer;
`;

export function AudioBtn({ text }: { text: string }) {
  const [voice, setVoice] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioElementRef = React.useRef<HTMLAudioElement | null>(null);
  const {mutateAsync: audioBuffer, data} = useOpenAITextToSpeechMutation();


  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const playAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    }
      };

  const generateVoice = async () => {
        setIsLoading(true);

    const resAudioBuffer = await audioBuffer({ text });

    // Check if audio data is valid
    if (!resAudioBuffer || !resAudioBuffer.data) {
      console.error("Invalid audio data received");
      return;
    }

    // Convert array buffer to Uint8Array
    const uint8Array = new Uint8Array(resAudioBuffer?.data);

    // Create Blob from Uint8Array
    const blob = new Blob([uint8Array], { type: 'audio/mpeg' });
        
    // Create URL from Blob
    const audioUrl = URL.createObjectURL(blob);

    setVoice(audioUrl);
    setIsLoading(false);

    audioElementRef.current = new Audio(audioUrl);
    audioElementRef.current.addEventListener("ended", handleAudioEnd);

    playAudio();
  };

  useEffect(() => {
    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.removeEventListener("ended", handleAudioEnd);
        audioElementRef.current.pause();
        setIsPlaying(false);
      }
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <Copy onClick={generateVoice}>Play Audio</Copy>;
  }

  return (
    <div>
      {isPlaying ? (
        <Button onClick={pauseAudio}>Stop Audio</Button>
      ) : (
        <Button onClick={playAudio}>Replay Audio</Button>
      )}
    </div>
  );
}

const Button = ({ onClick, children }: { onClick: any; children: any }) => {
  return (
    <Copy onClick={onClick}>
      <button onClick={onClick} className="py-2 px-4 border-2 border-gray-400 text-gray-700 my-5">
        {children}
      </button>
    </Copy>
  );
};
