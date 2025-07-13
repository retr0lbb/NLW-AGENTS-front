/** biome-ignore-all lint/suspicious/noConsole: Bla Bla Bla */

import { useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function RecordRoomAudio() {
  const params = useParams<{ roomId: string }>();
  const recorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const isRecordedSupported =
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function' &&
    typeof window.MediaRecorder === 'function';

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  function stopRecording() {
    setIsRecording(false);
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append('file', audio, 'audio.webm');

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();

    console.log(result);
  }

  async function startRecording() {
    if (isRecordedSupported !== true) {
      alert('Seu navegador nao suporta gravação');
      return;
    }

    setIsRecording(true);

    try {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100,
        },
      });

      recorderRef.current = new MediaRecorder(audio, {
        mimeType: 'audio/webm',
        audioBitsPerSecond: 64_000,
      });

      recorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          uploadAudio(event.data);
        }
      };

      recorderRef.current.onstart = () => {
        console.log('Gravacao iniciada');
      };

      recorderRef.current.onstop = () => {
        console.log('Gravacao encerrada');
      };

      recorderRef.current.start();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      {isRecording === true ? (
        <Button onClick={stopRecording}>Parar Gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar Audio</Button>
      )}
      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  );
}
