import { useEffect, useRef, useState } from "react";

/**
 * A chalkboard you draw on with a coffee cup. Four small cups sit on their
 * saucers down the side, one per flavour. Pick one up, drag it across the
 * board and it leaves a smear of whatever is in it; let go and it settles
 * back on its own saucer. Nothing is stored: a refresh wipes the board.
 */
const MIN_STEP_PX = 2;

/* What's in each cup. `smear` is what it leaves on the board (r, g, b);
   the rest colour the coffee in the cup so it matches. */
interface Flavour {
  name: string;
  smear: string;
  /** How opaque the smear is; dark colours need more to show on the board. */
  strength?: number;
  light: string;
  mid: string;
  deep: string;
  crema: string;
}

const flavours: Flavour[] = [
  { name: "mocha", smear: "74, 46, 26", strength: 2.1, light: "#5e4330", mid: "#3a2617", deep: "#21140c", crema: "#a67e52" },
  { name: "matcha", smear: "158, 170, 142", light: "#96a484", mid: "#6f7e5e", deep: "#4c5843", crema: "#c1cab0" },
  { name: "latte", smear: "222, 206, 180", light: "#ede2d0", mid: "#d2c0a3", deep: "#b09677", crema: "#f3eadb" },
  { name: "ube", smear: "168, 150, 184", light: "#a795b6", mid: "#7a678d", deep: "#554866", crema: "#cdc1d8" },
];

const Saucer = () => (
  <svg className="saucer" viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="47" fill="url(#saucer-glaze)" />
    {/* rim: light on the top left, shade on the bottom right, no outline */}
    <path d="M5.7 42.2A45 45 0 0 1 72.5 11" fill="none" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.4" filter="url(#blur-s)" />
    <path d="M94.3 57.8A45 45 0 0 1 27.5 89" fill="none" stroke="rgba(30, 20, 14, 0.22)" strokeWidth="2" filter="url(#blur-m)" />
    {/* the well the cup sits in, and the shadow it leaves */}
    <circle cx="50" cy="50" r="31" fill="url(#saucer-well)" />
    <circle cx="51" cy="52" r="27" fill="rgba(30, 20, 14, 0.22)" filter="url(#blur-l)" />
    <circle cx="50" cy="50" r="26.5" fill="none" stroke="rgba(120, 90, 55, 0.26)" strokeWidth="2.4" filter="url(#blur-m)" />
  </svg>
);

const Cup = ({ flavour }: { flavour: Flavour }) => {
  const id = `coffee-${flavour.name}`;
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="38%" cy="36%" r="66%">
          <stop offset="0%" stopColor={flavour.light} />
          <stop offset="48%" stopColor={flavour.mid} />
          <stop offset="100%" stopColor={flavour.deep} />
        </radialGradient>
        <radialGradient id={`${id}-crema`} cx="50%" cy="50%" r="50%">
          <stop offset="78%" stopColor={flavour.crema} stopOpacity="0" />
          <stop offset="100%" stopColor={flavour.crema} stopOpacity="0.6" />
        </radialGradient>
      </defs>

      {/* handle: its shadow, the loop, a highlight along its top */}
      <path d="M81 38.5C100 40.5 100 61 81 63V56.5C91 55.5 91 46 81 45Z" fill="rgba(30, 20, 14, 0.28)" filter="url(#blur-m)" />
      <path d="M80 37C99 39 99 61 80 63V56C90.5 55 90.5 45 80 44Z" fill="url(#cup-glaze)" />
      <path d="M82 39.5c6 .8 8.5 2.8 9.8 5.8" fill="none" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.3" strokeLinecap="round" filter="url(#blur-s)" />

      {/* body: shaded, with a lit rim on one side and shade on the other */}
      <circle cx="50" cy="50" r="34" fill="url(#cup-glaze)" />
      <path d="M18.5 44.4A32 32 0 0 1 66 22.3" fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.5" filter="url(#blur-s)" />
      <path d="M82 55.6A32.5 32.5 0 0 1 33.8 78.1" fill="none" stroke="rgba(30, 20, 14, 0.16)" strokeWidth="1.8" filter="url(#blur-m)" />

      {/* inside the cup: the wall falling away into shadow */}
      <circle cx="50" cy="50" r="28" fill="url(#cup-wall)" />
      <circle cx="50" cy="50" r="27.6" fill="none" stroke="rgba(30, 20, 14, 0.14)" strokeWidth="0.7" filter="url(#blur-s)" />

      {/* what's in it: a soft crema edge and the light on the surface */}
      <circle cx="50" cy="50" r="25" fill={`url(#${id})`} />
      <circle cx="50" cy="50" r="25" fill={`url(#${id}-crema)`} />
      <path d="M38 60c5-11 17-13 23-5" fill="none" stroke={flavour.crema} strokeWidth="1.4" opacity="0.22" strokeLinecap="round" filter="url(#blur-m)" />
      <ellipse cx="41" cy="40" rx="7" ry="4" fill="#ffffff" opacity="0.28" transform="rotate(-35 41 40)" filter="url(#blur-l)" />
    </svg>
  );
};

/* Gradients and blurs the cups and saucers share, defined once. */
const SharedDefs = () => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
    <defs>
      <radialGradient id="saucer-glaze" cx="36%" cy="32%" r="72%">
        <stop offset="0%" stopColor="#f5f0e5" />
        <stop offset="60%" stopColor="#dcd3c0" />
        <stop offset="100%" stopColor="#b6aa92" />
      </radialGradient>
      <radialGradient id="saucer-well" cx="50%" cy="50%" r="50%">
        <stop offset="70%" stopColor="rgba(30, 20, 14, 0)" />
        <stop offset="100%" stopColor="rgba(30, 20, 14, 0.24)" />
      </radialGradient>
      <radialGradient id="cup-glaze" cx="34%" cy="30%" r="74%">
        <stop offset="0%" stopColor="#fcf9f2" />
        <stop offset="55%" stopColor="#e9e2d2" />
        <stop offset="100%" stopColor="#c4b9a2" />
      </radialGradient>
      <radialGradient id="cup-wall" cx="50%" cy="50%" r="50%">
        <stop offset="74%" stopColor="rgba(30, 20, 14, 0)" />
        <stop offset="100%" stopColor="rgba(30, 20, 14, 0.34)" />
      </radialGradient>
      <filter id="blur-s" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.5" />
      </filter>
      <filter id="blur-m" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1" />
      </filter>
      <filter id="blur-l" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="2.2" />
      </filter>
    </defs>
  </svg>
);

const DoodleBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const holding = useRef<number | null>(null);
  const restRect = useRef<DOMRect | null>(null);
  const lastStamp = useRef<{ x: number; y: number } | null>(null);
  const [held, setHeld] = useState<number | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Size the bitmap to the element at device resolution. Resizing clears a
  // canvas; that is fine here, nothing is meant to last.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.getContext("2d")?.scale(dpr, dpr);
      setHasDrawn(false);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(canvas);
    return () => {
      observer.disconnect();
      document.body.classList.remove("holding-cup");
    };
  }, []);

  /** The trail the cup leaves: a wide wet wash with a darker thread through it. */
  const smear = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || holding.current === null) return;
    const { smear: colour, strength = 1 } = flavours[holding.current];
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle = `rgba(${colour}, ${Math.min(0.2 * strength, 0.6)})`;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    ctx.strokeStyle = `rgba(${colour}, ${Math.min((0.3 + Math.random() * 0.1) * strength, 0.9)})`;
    ctx.lineWidth = 2.6 + Math.random() * 1.4;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  };

  const carryCup = (clientX: number, clientY: number) => {
    const index = holding.current;
    const cup = index === null ? null : cupRefs.current[index];
    const rest = restRect.current;
    if (!cup || !rest) return;
    // Hold it so the base of the cup, a little below the centre, sits under
    // the pointer.
    const dx = clientX - (rest.left + rest.width * 0.5);
    const dy = clientY - (rest.top + rest.height * 0.6);
    cup.style.transform = `translate(${dx}px, ${dy}px) scale(1.12) rotate(-4deg)`;
  };

  const pickUp = (index: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    if (holding.current !== null) return;
    event.preventDefault();
    const cup = event.currentTarget;
    cup.setPointerCapture(event.pointerId);
    restRect.current = cup.getBoundingClientRect();
    holding.current = index;
    setHeld(index);
    document.body.classList.add("holding-cup");
    carryCup(event.clientX, event.clientY);
  };

  const carry = (event: React.PointerEvent<HTMLDivElement>) => {
    if (holding.current === null) return;
    carryCup(event.clientX, event.clientY);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const box = canvas.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    if (x < 0 || y < 0 || x > box.width || y > box.height) {
      lastStamp.current = null;
      return;
    }

    const last = lastStamp.current;
    if (last && Math.hypot(x - last.x, y - last.y) < MIN_STEP_PX) return;
    if (last) smear(last, { x, y });
    lastStamp.current = { x, y };
    if (!hasDrawn) setHasDrawn(true);
  };

  const putDown = () => {
    const index = holding.current;
    if (index === null) return;
    holding.current = null;
    lastStamp.current = null;
    setHeld(null);
    document.body.classList.remove("holding-cup");
    const cup = cupRefs.current[index];
    if (cup) cup.style.transform = ""; // back to its saucer, by transition
  };

  const wipe = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    setHasDrawn(false);
  };

  return (
    <div className="doodle">
      <SharedDefs />

      <div className="doodle__row">
        <div className="section-sign doodle__board">
          <canvas ref={canvasRef} className="doodle__canvas" aria-label="a board to doodle on with the cups" />
        </div>

        {/* The cups, each on its saucer, down the side of the board. */}
        <div className="cups" aria-label="cups to draw with">
          {flavours.map((flavour, index) => (
            <div key={flavour.name} className="cup-slot">
              <Saucer />
              <div
                ref={(node) => {
                  cupRefs.current[index] = node;
                }}
                className={`cup-tool ${held === index ? "is-holding" : ""}`}
                role="button"
                aria-label={`pick up the ${flavour.name} to draw with`}
                title={flavour.name}
                tabIndex={0}
                onPointerDown={pickUp(index)}
                onPointerMove={carry}
                onPointerUp={putDown}
                onPointerCancel={putDown}
              >
                <Cup flavour={flavour} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="doodle__foot">
        <span className="receipt-meta opacity-50">
          {hasDrawn ? "wiped on refresh" : "pick up a cup to doodle"}
        </span>
        <button type="button" className="doodle__wipe receipt-meta" onClick={wipe}>
          wipe it now
        </button>
      </div>
    </div>
  );
};

export default DoodleBoard;
