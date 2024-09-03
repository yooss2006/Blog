import { MorphingBlob } from "./css-loader/morphing-blob/morphing-blob";

export function FullScreenLoader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <MorphingBlob />
    </div>
  );
}
