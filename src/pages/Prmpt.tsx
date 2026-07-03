import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LEFT_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4";
const RIGHT_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4";

const images = [
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104530_521b2f85-c0f3-4d0e-9704-b578315b4cb9.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103711_76ccdb8b-5043-4f47-9c54-4379713393ea.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103728_394f6a1b-85e2-4386-a4f6-408472a0a5b7.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103739_86743e0e-16a7-4bee-bf38-dd67985344dc.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103748_b2215dc8-a3a7-470d-b19a-5b87fa7d0c37.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103758_e919ce72-5c9d-4b87-9be6-d7647b34825c.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103808_013583d0-3386-4547-9832-37c7d8edb3ac.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103937_a0c49d0a-33eb-4ead-aea6-c1baf241acbc.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103956_d18ed8fd-7b6f-4b86-91f9-20010fe38670.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104034_ba5a9963-87ff-4008-a545-6bd686c088b5.png&w=1920&q=85",
];

const SYMBOLS = ["8", "$", "^^", "%", "/"];

function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  let idx = 0;
  for (let r = 0; idx < count; r++) {
    const a = (r * 2 + (r % 2)) % cols;
    const row = new Array(cols).fill(-1);
    row[a] = idx++;
    if (r % 3 === 0 && idx < count) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = idx++;
    }
    rows.push(row);
  }
  return rows;
}

const Prmpt = () => {
  const scrollSpacerRef = useRef<HTMLDivElement>(null);
  const mainCanvasRef = useRef<HTMLDivElement>(null);
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const buyRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef(0);
  const activeSideRef = useRef<"left" | "right">("right");
  const gridRef = useRef<HTMLDivElement>(null);

  const [videosLoaded, setVideosLoaded] = useState(0);
  const [cols, setCols] = useState(4);
  const [spacerHeight, setSpacerHeight] = useState(0);

  const isDesktop = typeof window !== "undefined" ? window.innerWidth >= 1024 : false;
  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;

  const layout = buildLayout(images.length, cols);
  const rows = layout.length;

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 640) setCols(2);
      else if (w < 1024) setCols(3);
      else setCols(4);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const vh = window.innerHeight;
    const gridHeight = gridRef.current.scrollHeight;
    const maxScroll = Math.max(0, gridHeight - vh);
    const h = vh + maxScroll + 2 * vh;
    setSpacerHeight(h);
  }, [cols, rows]);

  useEffect(() => {
    if (spacerHeight === 0) return;
    const vh = window.innerHeight;
    const gridEl = gridRef.current;
    if (!gridEl) return;
    const gridHeight = gridEl.scrollHeight;
    const maxScroll = Math.max(0, gridHeight - vh);
    const outroOffset = isDesktop ? 166 : 132;

    ScrollTrigger.refresh();

    const panelTween = gsap.to(panelRef.current, {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: scrollSpacerRef.current,
        start: "top top",
        end: `+=${vh}`,
        scrub: true,
      },
    });

    const overlayTween = gsap.to(overlayRef.current, {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: scrollSpacerRef.current,
        start: `+=${vh + maxScroll}`,
        end: `+=${vh - 100}`,
        scrub: true,
      },
    });

    gsap.to(buyRef.current, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: scrollSpacerRef.current,
        start: `+=${vh + maxScroll}`,
        end: `+=${vh - 100}`,
        scrub: true,
      },
    });

    gsap.to(footerRef.current, {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: scrollSpacerRef.current,
        start: `+=${vh + maxScroll}`,
        end: `+=${vh - 100}`,
        scrub: true,
      },
    });

    gsap.to(infoRef.current, {
      y: -outroOffset,
      ease: "none",
      scrollTrigger: {
        trigger: scrollSpacerRef.current,
        start: `+=${vh + maxScroll}`,
        end: `+=${vh - 100}`,
        scrub: true,
      },
    });

    return () => {
      panelTween.kill();
      overlayTween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [spacerHeight, isDesktop]);

  useEffect(() => {
    const tick = () => {
      const vh = window.innerHeight;
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;
        if (bottom <= 0 || top >= vh) {
          card.style.transform = "scale(0)";
          return;
        }
        const enter = Math.min(1, (vh - top) / (vh * 0.6));
        const exit = Math.min(1, bottom / (vh * 0.4));
        const scale = Math.min(enter, exit);
        card.style.transform = `scale(${Math.max(0, scale)})`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    if (isTouch || !isDesktop) return;
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;
    const onMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop, isTouch]);

  useEffect(() => {
    if (isTouch || !isDesktop) return;
    const leftVid = leftVideoRef.current;
    const rightVid = rightVideoRef.current;
    const canvas = mainCanvasRef.current;
    if (!leftVid || !rightVid || !canvas) return;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const w = rect.width;
      const deadZone = Math.max(30, w * 0.05);
      const center = w / 2;

      if (x > center - deadZone && x < center + deadZone) {
        const active = activeSideRef.current === "left" ? leftVid : rightVid;
        if (!active.seeking) active.currentTime = 0;
        return;
      }

      if (x <= center - deadZone) {
        activeSideRef.current = "right";
        leftVid.style.display = "none";
        rightVid.style.display = "block";
        const range = center - deadZone;
        const progress = (range - x) / range;
        const time = Math.max(0, Math.min(progress * rightVid.duration, rightVid.duration - 0.1));
        if (!rightVid.seeking) rightVid.currentTime = time;
      } else {
        activeSideRef.current = "left";
        rightVid.style.display = "none";
        leftVid.style.display = "block";
        const range = center - deadZone;
        const progress = (x - center - deadZone) / range;
        const time = Math.max(0, Math.min(progress * leftVid.duration, leftVid.duration - 0.1));
        if (!leftVid.seeking) leftVid.currentTime = time;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop, isTouch]);

  useEffect(() => {
    if (isDesktop && !isTouch) return;
    const leftVid = leftVideoRef.current;
    const rightVid = rightVideoRef.current;
    if (!leftVid || !rightVid) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let isLeft = true;
    const playLeft = () => {
      rightVid.style.display = "none";
      leftVid.style.display = "block";
      leftVid.currentTime = 0;
      leftVid.play().catch(() => {});
      isLeft = true;
    };
    const playRight = () => {
      leftVid.style.display = "none";
      rightVid.style.display = "block";
      rightVid.currentTime = 0;
      rightVid.play().catch(() => {});
      isLeft = false;
    };

    leftVid.addEventListener("ended", playRight);
    rightVid.addEventListener("ended", playLeft);
    playLeft();

    return () => {
      leftVid.removeEventListener("ended", playRight);
      rightVid.removeEventListener("ended", playLeft);
    };
  }, [isDesktop, isTouch]);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const now = Date.now();
      if (now - last < 80) return;
      last = now;
      if (!circleRef.current) return;
      circleRef.current.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const halfCols = Math.floor(cols / 2);

  return (
    <div
      ref={scrollSpacerRef}
      id="scroll-spacer"
      className="relative bg-white"
      style={{ userSelect: "none", height: spacerHeight > 0 ? spacerHeight : "500vh" }}
    >
      {/* Custom Cursor */}
      {isDesktop && !isTouch && (
        <div
          id="custom-cursor"
          className="fixed pointer-events-none z-50"
          style={{ mixBlendMode: "exclusion", transform: "translate(-50%, -50%)" }}
        >
          <svg viewBox="0 0 48 48" width="48" height="48" fill="white">
            <circle cx="24" cy="24" r="22.75" fill="none" stroke="white" strokeWidth="2.5" />
            <text x="24" y="30" textAnchor="middle" fill="white" fontSize="20" fontFamily="serif">
              〆
            </text>
          </svg>
        </div>
      )}

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0 }}
        className="fixed pointer-events-none z-20"
        style={{
          mixBlendMode: "exclusion",
          top: "16px",
          left: "16px",
          width: "124px",
        }}
      >
        <svg viewBox="0 0 355 110" className="w-full h-auto" fill="white">
          <text
            x="0"
            y="72"
            fontFamily="'Inter Tight', sans-serif"
            fontWeight="500"
            fontSize="68"
            letterSpacing="-0.04em"
          >
            prmpt
          </text>
          <circle cx="330" cy="55" r="26" fill="none" stroke="white" strokeWidth="2" />
          <text
            x="330"
            y="63"
            fontFamily="'Inter Tight', sans-serif"
            fontWeight="500"
            fontSize="24"
            textAnchor="middle"
            letterSpacing="-0.04em"
          >
            R
          </text>
        </svg>
      </motion.div>

      {/* Caption */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        className="fixed pointer-events-none z-20 hidden md:block"
        style={{
          mixBlendMode: "exclusion",
          left: "32px",
          top: "244px",
          width: "692px",
        }}
      >
        <p
          className="text-white"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "140%",
            letterSpacing: "-0.04em",
          }}
        >
          When switching between videos near the center, do not reset currentTime to 0 abruptly. Add
          a small dead zone: if cursor is within +/-50px of center, keep both videos at currentTime =
          0 and show whichever was last active.
        </p>
      </motion.div>

      {/* Header Nav */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
        className="fixed pointer-events-none z-20"
        style={{
          mixBlendMode: "exclusion",
          top: "32px",
          right: "32px",
          width: "330px",
          height: "30px",
        }}
      >
        <div className="flex items-center justify-between w-full">
          <span
            className="text-white hidden md:inline"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "15px",
              letterSpacing: "-0.02em",
            }}
          >
            ABOUT
          </span>
          <div className="flex items-center gap-[50px] md:gap-[50px] gap-5">
            <svg viewBox="0 0 40 40" width="30" height="30" className="md:w-[30px] md:h-[30px] w-6 h-6">
              <line x1="0" y1="14" x2="40" y2="14" stroke="white" strokeWidth="2.5" />
              <line x1="0" y1="26" x2="40" y2="26" stroke="white" strokeWidth="2.5" />
            </svg>
            <span
              className="text-white"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                letterSpacing: "-0.02em",
              }}
            >
              [ CART ]
            </span>
          </div>
        </div>
      </motion.div>

      {/* Product Info */}
      <motion.div
        id="outro-info"
        ref={infoRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.45 }}
        className="fixed pointer-events-none z-20"
        data-outro-offset={isDesktop ? 166 : 132}
        style={{
          mixBlendMode: "exclusion",
          right: "32px",
          bottom: "80px",
          width: "330px",
        }}
      >
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-start w-full mb-[32px]">
            <div className="relative w-[30px] h-[30px] flex items-center justify-center mb-2">
              <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full">
                <circle cx="20" cy="20" r="18.75" fill="none" stroke="white" strokeWidth="2.5" />
              </svg>
              <span
                ref={circleRef}
                id="circle-symbol"
                className="relative text-white"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                }}
              >
                8
              </span>
            </div>
            <span
              className="text-white text-center w-full"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "30px",
                lineHeight: "100%",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
              }}
            >
              ARCHIVE COLLECTION
              <br />
              &ldquo;PROMPT&rdquo;
            </span>
          </div>
          <span
            className="text-white text-center w-full"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "80px",
              lineHeight: "100%",
              letterSpacing: "-0.04em",
            }}
          >
            $97,33
          </span>
        </div>
      </motion.div>

      {/* View Button */}
      <div
        id="outro-buy"
        ref={buyRef}
        className="fixed pointer-events-none z-20 flex items-center justify-center"
        style={{
          mixBlendMode: "exclusion",
          right: "32px",
          bottom: "32px",
          width: "330px",
          height: "174px",
          transformOrigin: "right bottom",
          transform: "scale(0)",
          background: "#fff",
          borderRadius: "1335px",
        }}
      >
        <span
          className="text-white"
          style={{
            mixBlendMode: "exclusion",
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: "110px",
            letterSpacing: "-0.04em",
          }}
        >
          view
        </span>
      </div>

      {/* Video Container */}
      <div
        ref={mainCanvasRef}
        id="main-canvas"
        className="fixed inset-0 z-0 overflow-hidden"
        style={{
          pointerEvents: "none",
          opacity: videosLoaded >= 2 ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <video
          ref={leftVideoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: "none" }}
          onLoadedData={() => setVideosLoaded((v) => v + 1)}
        >
          <source src={LEFT_VIDEO} type="video/mp4" />
        </video>
        <video
          ref={rightVideoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: "block" }}
          onLoadedData={() => setVideosLoaded((v) => v + 1)}
        >
          <source src={RIGHT_VIDEO} type="video/mp4" />
        </video>
      </div>

      {/* Black Panel */}
      <div
        ref={panelRef}
        className="fixed inset-0 z-10 bg-black overflow-auto"
        style={{ transform: "translateY(100vh)" }}
      >
        <div
          className="w-full"
          style={{ paddingTop: "min(400px, 40vh)", paddingLeft: "16px", paddingRight: "16px", paddingBottom: "40vh" }}
        >
          <div
            ref={gridRef}
            className="grid gap-3 mx-auto"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              maxWidth: cols === 2 ? "500px" : cols === 3 ? "800px" : "1100px",
            }}
          >
            {layout.map((row, ri) =>
              row.map((imgIdx, ci) => {
                if (imgIdx < 0) {
                  return <div key={`empty-${ri}-${ci}`} style={{ aspectRatio: "2/3" }} />;
                }
                return (
                  <div
                    key={imgIdx}
                    ref={(el) => {
                      cardsRef.current[imgIdx] = el;
                    }}
                    className="bp-card overflow-hidden rounded-lg"
                    style={{
                      aspectRatio: "2/3",
                      transform: "scale(0)",
                      willChange: "transform",
                      transformOrigin: ci < halfCols ? "right bottom" : "left bottom",
                    }}
                  >
                    <img
                      src={images[imgIdx]}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* White Overlay */}
      <div
        id="outro-overlay"
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none z-[12]"
        style={{ background: "#fff", opacity: 0 }}
      />

      {/* Footer */}
      <div
        id="outro-footer"
        ref={footerRef}
        className="fixed pointer-events-none z-20"
        style={{
          mixBlendMode: "exclusion",
          left: "16px",
          bottom: "32px",
          opacity: 0,
        }}
      >
        <div className="flex gap-[80px] items-center">
          <span
            className="text-white uppercase"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "-0.02em",
            }}
          >
            PRMPT (R) 2026
          </span>
          <span
            className="text-white uppercase"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "-0.02em",
            }}
          >
            PRIVACY POLICY
          </span>
        </div>
      </div>
    </div>
  );
};

export default Prmpt;
