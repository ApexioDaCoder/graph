import { useRef, useEffect, useState } from "react";
import useCanvas from "../lib/useCanvas";
import useTween, { update } from "../lib/useTween";

const drawCircle = (ctx, x, y, r, color = "rgb(255, 246, 230)") => {
  ctx.fillStyle = "rgba(10,10,10,0.5)";
  ctx.beginPath();
  ctx.arc(x, y + r / 4, r * 1.1, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "rgb(39, 35, 37)";
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(x, y - 10, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.lineWidth = 7;
  ctx.stroke();
};

const roundLine = (ctx, x1, y1, x2, y2, thickness = 2) => {
  ctx.fillStyle = ctx.strokeStyle;
  ctx.beginPath();
  ctx.arc(x1, y1, thickness / 2, 0, 2 * Math.PI);
  ctx.arc(x2, y2, thickness / 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = thickness;
  ctx.stroke();
};

const Canvas = (props) => {
  let size = 40; //40;
  const [radius, startAnimation] = useTween(
    { radius: 0 },
    {
      normal: { radius: size },
      grow: { radius: size + 10 },
    }
  );
  const draw = (ctx) => {
    update();
    let canvas = ctx.canvas;
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    ctx.strokeStyle = "rgb(70,70,70)";
    ctx.setLineDash([3]);
    roundLine(ctx, x, 0, x, canvas.height, 2);
    roundLine(ctx, 0, y, canvas.width, y, 2);
    ctx.setLineDash([]);
    ctx.strokeStyle = "rgb(255, 246, 230)";
    let r = radius.radius;
    drawCircle(ctx, canvas.width - size * 2, canvas.height - size * 2, r);
  };

  const canvasRef = useCanvas(draw);

  useEffect(() => {
    startAnimation("normal", 500);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      onMouseEnter={() => {
        startAnimation("grow", 100);
      }}
      onMouseLeave={() => {
        startAnimation("normal", 100);
      }}
      {...props}
    />
  );
};

export default Canvas;
