import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'matrix-background',
  imports: [],
  template: `<canvas #canvas class="w-screen h-screen overflow-hidden"></canvas> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private w!: number;
  private h!: number;

  private text = 'Danny Cabrera - Portfolio Front-End Developer';
  private textArray = this.text.split('');

  private drops: {
    angle: number;
    radius: number;
    direction: number;
    textIndex: number; // índice para el texto
  }[] = [];

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.resizeCanvas();
    setInterval(() => this.vortexColumns(), 50);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.resizeCanvas();
  }

  private resizeCanvas() {
    this.w = this.canvas.nativeElement.width = window.innerWidth;
    this.h = this.canvas.nativeElement.height = window.innerHeight;

    this.drops = [];
    const numCols = Math.floor(this.w / 20 / 2);

    for (let i = 0; i < numCols; i++) {
      const direction = Math.random() < 0.5 ? 1 : -1;
      const angleRight = Math.random() * Math.PI * 2;
      const radius = 150 + i * 20;

      const textIndex = Math.floor(Math.random() * this.textArray.length);

      this.drops.push({ angle: angleRight, radius, direction, textIndex });

      this.drops.push({ angle: angleRight + Math.PI, radius, direction, textIndex });

      this.drops.push({ angle: angleRight + Math.PI / 2, radius, direction, textIndex });

      this.drops.push({ angle: angleRight - Math.PI / 2, radius, direction, textIndex });
    }
  }

  private vortexColumns() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, this.w, this.h);

    ctx.font = '15pt monospace';

    const centerX = this.w / 2;
    const centerY = this.h / 2;

    this.drops.forEach((drop) => {
      const x = centerX + drop.radius * Math.cos(drop.angle);
      const y = centerY + drop.radius * Math.sin(drop.angle);

      const char = this.textArray[drop.textIndex];
      ctx.fillStyle = '#0f0';
      ctx.fillText(char, x, y);

      drop.angle += 0.05 * drop.direction;

      // siguiente letra del texto
      drop.textIndex = (drop.textIndex + 1) % this.textArray.length;
    });
  }
}
