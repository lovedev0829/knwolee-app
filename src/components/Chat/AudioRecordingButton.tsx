/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
// @ts-ignore
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import Recording01Icon from "src/Icons/Recording01Icon";

import { ServerResponse } from "src/api/requests/client";
import { SpeechToTextResponse } from "src/utils";
import { useSpeechDetection } from "src/utils/audio";

interface Props {
  transcriptionMutation: UseMutationResult<
    SpeechToTextResponse,
    AxiosError<ServerResponse<SpeechToTextResponse>>,
    FormData
  >;
  startRecordingButtonId?: string;
  stopRecordingButtonId?: string;
  setIsRecording?: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled?: boolean;
}

function AudioRecordingButton({ transcriptionMutation, startRecordingButtonId = "start-rec-button-id", stopRecordingButtonId = "stop-rec-button-id", setIsRecording = () => {}, isDisabled = false }: Props) {
  // const [isAudioBlocked, setIsAudioBlocked] = useState(true);
  const userSpeechEndDetected = () => document.getElementById(stopRecordingButtonId)?.click();
  const { recognition } = useSpeechDetection({ onSpeechEnd: userSpeechEndDetected })
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err: unknown) => {
      console.table(err); // onNotAllowedOrFound
      alert("please allow microphone permission");
    }
  );

  const addAudioElement = (blob: BlobPart) => {
    
    // const url = URL.createObjectURL(blob);
    const file = new File([blob], "filename.mp3", { type: "audio/mp3" });
    //console.log("file----->", file);

    const formData = new FormData();
    formData.append("file", file);
    transcriptionMutation.mutate(formData);
  };

  function secondsToTime(seconds = 0) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  }

  const formattedRecordingTime = secondsToTime(
    recorderControls.recordingTime
  );

  // useEffect(() => {
  //   navigator.mediaDevices.getUserMedia({ audio: true });
  //   // .then(() => setIsAudioBlocked(false))
  //   // .catch(() => setIsAudioBlocked(true));
  // }, []);

  const stopListening = () => {
    if(recognition) {
      recognition.stop();
    }
    setIsRecording(false)
    recorderControls.stopRecording();
  }
  
  const startListening = async () => {
    let audioPermissionGranted = false;
    await navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        audioPermissionGranted = true;
      })
      .catch((error) => {
        console.error(error);
      });

    if (!audioPermissionGranted) {
      alert("please allow microphone permission");
      return;
    }

    if (recognition) {
      recognition.start();
    }
    setIsRecording(true);
    recorderControls.startRecording();
  };

  return (
    <>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        recorderControls={recorderControls}
        // downloadOnSavePress={true}
        // downloadFileExtension="mp3"
        // showVisualizer={true}
        classes={{
          AudioRecorderClass: "hidden",
          AudioRecorderStartSaveClass: "hidden",
          AudioRecorderTimerClass: "hidden",
          AudioRecorderStatusClass: "hidden",
          AudioRecorderPauseResumeClass: "hidden",
          AudioRecorderDiscardClass: "hidden",
        }}
      />
      <Box  pt={1} py={0} px={2} display="grid" placeItems="center" position="relative">
        {transcriptionMutation.isLoading ? (
          <Spinner speed="0.8s" color="primary.50" />
        ) : recorderControls.isRecording ? (
          <button id={stopRecordingButtonId} disabled={isDisabled} style={{ cursor: isDisabled ? "not-allowed": "pointer"}} onClick={stopListening}>
            <Recording01Icon
              pathStroke="#0E64F1"
            />
            <Box
              position="absolute"
              left="-82px"
              top="50%"
              transform="translate(0, -50%)"
            >
              <Text
                // color="neutral.100"
                opacity="0.75"
              >
                {formattedRecordingTime}
              </Text>
            </Box>
          </button>
        ) : (
          <button id={startRecordingButtonId} disabled={isDisabled} style={{ cursor: isDisabled ? "not-allowed": "pointer"}} onClick={startListening}>
            <Recording01Icon  />
          </button>
        )}
      </Box>
    </>
  );
}

export default AudioRecordingButton;
