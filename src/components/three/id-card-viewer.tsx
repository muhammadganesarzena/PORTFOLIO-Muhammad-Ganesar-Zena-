import { Lanyard } from "./lanyard";

export function IdCardViewer() {
  return (
    <div className="h-full w-full" style={{ pointerEvents: "auto" }}>
      <Lanyard
        position={[0, 0, 15]}
        gravity={[0, -40, 0]}
        fov={30}
        transparent={true}
      />
    </div>
  );
}