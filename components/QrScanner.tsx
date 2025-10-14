
import React, { useRef, useEffect, useState } from 'react';
import { CloseIcon } from './icons';

declare const jsQR: any;

interface QrScannerProps {
    onScanSuccess: (data: string) => void;
    onClose: () => void;
}

export const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const openCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.setAttribute('playsinline', 'true'); // Required for iOS
                    videoRef.current.play();
                    requestAnimationFrame(tick);
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError("Could not access camera. Please grant permission and try again.");
            }
        };

        const tick = () => {
            if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current) {
                const canvas = canvasRef.current;
                const video = videoRef.current;
                const context = canvas.getContext('2d');

                if (context) {
                    canvas.height = video.videoHeight;
                    canvas.width = video.videoWidth;
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert",
                    });

                    if (code) {
                        onScanSuccess(code.data);
                        return; // Stop scanning
                    }
                }
            }
            if(streamRef.current) {
                requestAnimationFrame(tick);
            }
        };

        openCamera();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onScanSuccess]);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative bg-slate-800 rounded-lg w-full max-w-lg aspect-square overflow-hidden shadow-xl">
                <button onClick={onClose} className="absolute top-2 right-2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/75">
                    <CloseIcon className="w-6 h-6"/>
                </button>
                <video ref={videoRef} className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute inset-0 border-8 border-cyan-500/50 rounded-lg" style={{ clipPath: 'polygon(0% 0%, 0% 25%, 25% 25%, 25% 0%, 100% 0%, 100% 25%, 75% 25%, 75% 0%, 75% 0%, 75% 75%, 100% 75%, 100% 100%, 75% 100%, 75% 75%, 25% 75%, 25% 100%, 0% 100%, 0% 75%, 25% 75%, 25% 25%, 0% 25%)' }} />
                {error && <div className="absolute bottom-4 left-4 right-4 bg-red-500/80 text-white text-center p-2 rounded">{error}</div>}
            </div>
        </div>
    );
};
