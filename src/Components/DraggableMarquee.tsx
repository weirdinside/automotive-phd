import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  Children,
} from "react";

type Direction = "horizontal" | "vertical";

interface DraggableMarqueeProps {
  children: React.ReactNode;
  aspectRatio?: string;
  direction?: Direction;
  gap?: number | string;
  speed?: number;
  pauseAfterInteractMs?: number;
}

export default function DraggableMarquee({
  children,
  direction = "horizontal",
  gap = 20,
  speed = 0.5,
  pauseAfterInteractMs = 600,
}: DraggableMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [pos, setPos] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [initialPointer, setInitialPointer] = useState<number>(0);

  const items = useMemo(() => Children.toArray(children), [children]);

  function clearResumeTimer() {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }

  function pauseThenResumeSoon() {
    setPaused(true);
    clearResumeTimer();
    resumeTimerRef.current = setTimeout(() => {
      setPaused(false);
    }, pauseAfterInteractMs);
  }

  function calculateStartPos() {
    if (!marqueeRef.current) return;
    const size =
      direction === "horizontal"
        ? marqueeRef.current.offsetWidth
        : marqueeRef.current.offsetHeight;
    const initial = size / 3;
    setPos(initial);
    return initial;
  }

  function getPointerAxis(
    e: React.PointerEvent<HTMLDivElement> | PointerEvent
  ) {
    return direction === "horizontal" ? (e as any).clientX : (e as any).clientY;
  }

  function handleDragMove(
    e: React.PointerEvent<HTMLDivElement> | PointerEvent
  ) {
    const movement = getPointerAxis(e);
    setPos((prev) => prev - (movement - initialPointer));
    setInitialPointer(movement);
  }

  useLayoutEffect(() => {
    calculateStartPos();
  }, [direction]);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const animate = () => {
      if (!marqueeRef.current || paused) return;

      const size =
        direction === "horizontal"
          ? marqueeRef.current.offsetWidth
          : marqueeRef.current.offsetHeight;

      const trueMiddle = size / 2;
      const firstMiddle = size / 6;

      setPos((prev) => (prev >= trueMiddle ? firstMiddle : prev + speed));
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [paused, direction, speed]);

  useEffect(() => {
    const onResize = () => calculateStartPos();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [direction]);

  useEffect(() => {
    const handlePointerUp = () => {
      if (dragging) {
        setDragging(false);
        pauseThenResumeSoon();
      }
    };
    const handlePointerCancel = handlePointerUp;

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerCancel);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [dragging]);

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setPaused(true);
    clearResumeTimer();
    const delta =
      direction === "horizontal" ? e.deltaX || e.deltaY : e.deltaY || e.deltaX;
    setPos((prev) => prev + delta);
    resumeTimerRef.current = setTimeout(
      () => setPaused(false),
      pauseAfterInteractMs
    );
  };

  const wrapperStyle: React.CSSProperties = {
    flexShrink: 0,
    display: "flex",
    overflow: "hidden",
    userSelect: "none",
    flexDirection: direction === "horizontal" ? "row" : "column",
    touchAction: "none",
  };

  const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: direction === "horizontal" ? "row" : "column",
    width: direction === "horizontal" ? "max-content" : "100%",
    height: direction === "vertical" ? "max-content" : "100%",
    gap: typeof gap === "number" ? `${gap}px` : gap,
    transform:
      direction === "horizontal"
        ? `translateX(-${pos}px)`
        : `translateY(-${pos}px)`,
    willChange: "transform",
  };

  const itemStyle: React.CSSProperties = {
    flex: "0 0 auto",
    boxSizing: "border-box",
  };

  const renderPass = (passIndex: number) =>
    items.map((child, idx) => (
      <div key={`${passIndex}-${idx}`} style={itemStyle}>
        {child}
      </div>
    ));

  return (
    <div style={wrapperStyle}>
      <div
        ref={marqueeRef}
        style={contentStyle}
        onPointerDown={(e) => {
          setDragging(true);
          setPaused(true);
          setInitialPointer(getPointerAxis(e));
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (dragging) handleDragMove(e);
        }}
        onPointerUp={(e) => {
          (e.currentTarget as HTMLDivElement).releasePointerCapture(
            e.pointerId
          );
          setDragging(false);
          pauseThenResumeSoon();
        }}
        onPointerCancel={() => {
          setDragging(false);
          pauseThenResumeSoon();
        }}
        onWheel={onWheel}
      >
        {renderPass(0)}
        {renderPass(1)}
        {renderPass(2)}
      </div>
    </div>
  );
}
