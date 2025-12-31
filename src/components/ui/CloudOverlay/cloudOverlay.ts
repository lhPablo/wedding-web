export interface CloudConfig {
  id: number;
  side: string;
  style: {
    '--cloud-scale': number;
    '--cloud-pos': string;
    '--cloud-depth': string;
    '--cloud-delay': string;
    '--cloud-z': number;
  };
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export function generateClouds(count: number = 80): CloudConfig[] {
  const sides = ['left', 'right', 'top', 'bottom'];

  return Array.from({ length: count }).map((_, i) => {
    let sideIdx = Math.floor(Math.random() * 4);

    const side = sides[sideIdx];
    const position = random(-10, 110);
    const depth = random(0, 55);
    const scale = random(1.5, 3.5);
    const delay = random(0, 0.2);
    const zIndex = Math.floor(random(10, 30));

    return {
      id: i,
      side,
      style: {
        '--cloud-scale': scale,
        '--cloud-pos': `${position}%`,
        '--cloud-depth': `${depth}vw`,
        '--cloud-delay': `${delay}s`,
        '--cloud-z': zIndex,
      },
    };
  });
}
