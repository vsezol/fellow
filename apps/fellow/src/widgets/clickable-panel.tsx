import { useEffect, useRef } from 'react';
import { useIsMobile } from '../shared';
import { usePreferredTheme } from '../shared/lib/theme';

type RGBColor = [number, number, number];

const CIRCLE_COLOR_LIGHT: RGBColor = [74, 0, 255];
const CIRCLE_COLOR_DARK: RGBColor = [116, 127, 255];

interface Circle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

export type ClickablePanelProps = {
  onClick?: () => void;
};

export const ClickablePanel = ({ onClick }: ClickablePanelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const contextRef = useRef<CanvasRenderingContext2D>();
  const isMobile = useIsMobile();

  const theme = usePreferredTheme();
  const circleColor = useRef<RGBColor>();

  const circlesRef = useRef<Circle[]>([]);

  const setCanvas = (element: HTMLCanvasElement | null) => {
    const canvas = element;
    const context = element?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    canvasRef.current = canvas;
    contextRef.current = context;
  };

  useEffect(() => {
    circleColor.current =
      theme === 'dark' ? CIRCLE_COLOR_DARK : CIRCLE_COLOR_LIGHT;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;

    if (!canvas || !context) {
      return;
    }

    let animationFrameId: number;

    const drawCircles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      circlesRef.current.forEach((circle) => {
        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);

        context.fillStyle = `rgba(${circleColor?.current?.join(',')}, ${
          circle.opacity
        })`;
        context.fill();
      });
    };

    const updateCircles = () => {
      circlesRef.current = circlesRef.current
        .map((circle) => ({
          ...circle,
          radius: circle.radius + 1,
          opacity: circle.opacity - 0.003,
        }))
        .filter((circle) => circle.opacity > 0);

      drawCircles();
      animationFrameId = requestAnimationFrame(updateCircles);
    };

    updateCircles();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const spawnCircle = (x: number, y: number) => {
      onClick?.();

      navigator?.vibrate?.(50);

      const rect = canvasRef?.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      circlesRef.current.push({
        x: x - rect.left,
        y: y - rect.top,
        radius: 0,
        opacity: 1,
      });
    };

    const handleClick = (event: MouseEvent) => {
      spawnCircle(event.clientX, event.clientY);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      Array.from(event.changedTouches).forEach((touch) =>
        spawnCircle(touch.clientX, touch.clientY)
      );
    };

    if (isMobile) {
      window.addEventListener('touchend', handleTouchEnd);
    } else {
      window.addEventListener('click', handleClick);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('touchend', handleTouchEnd);
      } else {
        window.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <canvas
      ref={setCanvas}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};
