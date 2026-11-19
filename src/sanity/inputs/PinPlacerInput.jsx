import { set, unset, useFormValue } from "sanity";

// Pins stay clear of the edges so they are never cut off by the image frame.
const MIN = 4;
const MAX = 96;
const clamp = (n) => Math.min(MAX, Math.max(MIN, Math.round(n * 10) / 10));
const newKey = () => Math.random().toString(36).slice(2, 10);

// A Sanity image reference looks like "image-<id>-<width>x<height>-<ext>".
function imageUrl(ref) {
  const match = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/.exec(ref ?? "");
  if (!match) return null;
  const [, id, size, ext] = match;
  const project = import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
  return `https://cdn.sanity.io/images/${project}/${dataset}/${id}-${size}.${ext}?w=1000&auto=format`;
}

const pinStyle = {
  position: "absolute",
  width: 24,
  height: 24,
  transform: "translate(-50%, -50%)",
  borderRadius: "50%",
  border: "2px solid #fff",
  background: "#5646ab",
  color: "#fff",
  font: "600 12px system-ui, sans-serif",
  cursor: "pointer",
  padding: 0,
};

/**
 * Studio input for a media block's pins: click the picture to drop a pin, click
 * a pin to remove it. Pin 1 matches legend line 1. The standard list editor
 * stays underneath, so pins can also be nudged with the keyboard (x and y).
 */
export function PinPlacerInput(props) {
  const { value, onChange, path, renderDefault } = props;
  const images = useFormValue([...path.slice(0, -1), "images"]);
  const url = imageUrl(images?.[0]?.asset?._ref);
  const pins = value ?? [];

  const addPin = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100);
    onChange(set([...pins, { _key: newKey(), _type: "pin", x, y }]));
  };

  const removePin = (pinKey) => {
    const next = pins.filter((pin) => pin._key !== pinKey);
    onChange(next.length ? set(next) : unset());
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {url ? (
        <>
          <p style={{ margin: 0, fontSize: 13 }}>
            Click the image to add a pin. Click a pin to remove it. Pin 1 matches
            legend line 1, pin 2 matches line 2, and so on.
          </p>
          <div
            onClick={addPin}
            style={{ position: "relative", maxWidth: 640, cursor: "crosshair", lineHeight: 0 }}
          >
            <img src={url} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
            {pins.map((pin, i) => (
              <button
                key={pin._key}
                type="button"
                title="Remove this pin"
                onClick={(event) => {
                  event.stopPropagation();
                  removePin(pin._key);
                }}
                style={{ ...pinStyle, left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p style={{ margin: 0, fontSize: 13 }}>Add the image above first, then place pins on it here.</p>
      )}
      {renderDefault(props)}
    </div>
  );
}
