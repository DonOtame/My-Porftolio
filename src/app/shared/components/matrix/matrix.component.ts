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
  template: `<canvas #canvas class="w-full h-full"></canvas> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private w!: number;
  private h!: number;
  private cols!: number;
  private ypos!: number[];

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.resizeCanvas();
    this.ypos = Array(this.cols).fill(0);
    setInterval(() => this.matrix(), 50);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.resizeCanvas();
  }

  private resizeCanvas() {
    this.w = this.canvas.nativeElement.width = window.innerWidth;
    this.h = this.canvas.nativeElement.height = window.innerHeight;
    this.cols = Math.floor(this.w / 20) + 1;
    this.ypos = Array(this.cols).fill(0);
  }

  private matrix() {
    const ctx = this.ctx;
    ctx.fillStyle = '#0001';
    ctx.fillRect(0, 0, this.w, this.h);

    ctx.fillStyle = '#0f0';
    ctx.font = '15pt monospace';

    this.ypos.forEach((y, ind) => {
      const text = String.fromCharCode(Math.random() * 128);
      const x = ind * 20;
      ctx.fillText(text, x, y);
      if (y > 100 + Math.random() * 10000) this.ypos[ind] = 0;
      else this.ypos[ind] = y + 20;
    });
  }
}
