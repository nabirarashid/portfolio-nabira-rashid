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
  light: string;
  mid: string;
  deep: string;
  crema: string;
}

const flavours: Flavour[] = [
  { name: "mocha", smear: "186, 146, 100", light: "#5e4330", mid: "#3a2617", deep: "#21140c", crema: "#a67e52" },
  { name: "matcha", smear: "158, 170, 142", light: "#96a484", mid: "#6f7e5e", deep: "#4c5843", crema: "#c1cab0" },
  { name: "latte", smear: "222, 206, 180", light: "#ede2d0", mid: "#d2c0a3", deep: "#b09677", crema: "#f3eadb" },
  { name: "ube", smear: "168, 150, 184", light: "#a795b6", mid: "#7a678d", deep: "#554866", crema: "#cdc1d8" },
];

const Saucer = () => (
  <svg className="saucer" viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="47" fill="url(#saucer-glaze)" />
    <circle cx="50" cy="50" r="46.5" fill="none" stroke="rgba(48, 36, 33, 0.14)" strokeWidth="1" />
    <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" />
    <circle cx="50" cy="50" r="31" fill="url(#saucer-well)" />
    <circle cx="50" cy="50" r="31" fill="none" stroke="rgba(48, 36, 33, 0.1)" strokeWidth="0.8" />
    <circle cx="50" cy="50" r="26.5" fill="none" stroke="rgba(120, 90, 55, 0.32)" strokeWidth="2.2" filter="url(#soft)" />
  </svg>
);

const Cup = ({ flavour }: { flavour: Flavour }) => {
  const id = `coffee-${flavour.name}`;
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="40%" cy="38%" r="65%">
          <stop offset="0%" stopColor={flavour.light} />
          <stop offset="45%" stopColor={flavour.mid} />
          <stop offset="100%" stopColor={flavour.deep} />
        </radialGradient>
      </defs>
      {/* handle: a loop with thickness; the body sits over its root */}
      <path
        d="M79 34.5C104 37 104 63 79 65.5V57.5C94.5 56 94.5 44 79 42.5Z"
        fill="url(#cup-glaze)"
        stroke="rgba(48, 36, 33, 0.16)"
        strokeWidth="0.8"
      />
      <path d="M81.5 39.5c9.5 1.5 9.5 19.5 0 21" fill="none" stroke="rgba(48, 36, 33, 0.14)" strokeWidth="1.2" />
      <path d="M82 37.5c7 1 9.5 3 10.5 6" fill="none" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.4" strokeLinecap="round" />
      {/* body and rim */}
      <circle cx="50" cy="50" r="34" fill="url(#cup-glaze)" />
      <circle cx="50" cy="50" r="33.6" fill="none" stroke="rgba(48, 36, 33, 0.16)" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="30.5" fill="none" stroke="url(#cup-rim)" strokeWidth="5.5" />
      <circle cx="50" cy="50" r="27.6" fill="none" stroke="rgba(48, 36, 33, 0.14)" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="27.5" fill="url(#cup-wall)" />
      {/* what's in it: crema at the edge, a slow swirl, the light on it */}
      <circle cx="50" cy="50" r="24.5" fill={`url(#${id})`} />
      <circle cx="50" cy="50" r="23.6" fill="none" stroke={flavour.crema} strokeWidth="2" opacity="0.85" />
      <circle cx="50" cy="50" r="22" fill="none" stroke={flavour.crema} strokeWidth="0.9" opacity="0.35" />
      <path d="M40 58c4-10 16-12 21-4" fill="none" stroke={flavour.crema} strokeWidth="1.2" opacity="0.28" strokeLinecap="round" />
      <ellipse cx="41" cy="40.5" rx="6.5" ry="3.6" fill="#ffffff" opacity="0.22" transform="rotate(-35 41 40.5)" filter="url(#cup-soft)" />
    </svg>
  );
};

/* Gradients the cups and saucers share, defined once. */
const SharedDefs = () => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
    <defs>
      <linearGradient id="saucer-glaze" x1="18%" y1="12%" x2="85%" y2="92%">
        <stop offset="0%" stopColor="#f6f1e6" />
        <stop offset="55%" stopColor="#e4dccb" />
        <stop offset="100%" stopColor="#c6baa3" />
      </linearGradient>
      <radialGradient id="saucer-well" cx="50%" cy="50%" r="50%">
        <stop offset="72%" stopColor="rgba(48, 36, 33, 0)" />
        <stop offset="100%" stopColor="rgba(48, 36, 33, 0.2)" />
      </radialGradient>
      <linearGradient id="cup-glaze" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stopColor="#faf6ee" />
        <stop offset="50%" stopColor="#ebe4d6" />
        <stop offset="100%" stopColor="#cbbfa9" />
      </linearGradient>
      <linearGradient id="cup-rim" x1="85%" y1="90%" x2="15%" y2="10%">
        <stop offset="0%" stopColor="#f9f5ec" />
        <stop offset="100%" stopColor="#d9d0bd" />
      </linearGradient>
      <radialGradient id="cup-wall" cx="50%" cy="50%" r="50%">
        <stop offset="76%" stopColor="rgba(48, 36, 33, 0)" />
        <stop offset="100%" stopColor="rgba(48, 36, 33, 0.28)" />
      </radialGradient>
      <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.4" />
      </filter>
      <filter id="cup-soft" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.2" />
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
    const colour = flavours[holding.current].smear;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle = `rgba(${colour}, 0.2)`;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    ctx.strokeStyle = `rgba(${colour}, ${0.3 + Math.random() * 0.1})`;
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
