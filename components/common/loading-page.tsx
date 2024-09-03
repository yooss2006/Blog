import { MorphingBlob } from "./css-loader/morphing-blob/morphing-blob";

export function LoadingPage() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
      <MorphingBlob size="large" />
    </div>
  );
}
