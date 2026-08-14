/* RiffForge / chord diagram SVG: enam senar, lima fret, label open/mute, nomor jari, dan bentuk data yang mudah diperluas. */
type FingerPosition = { string: number; fret: number; finger: number };
type ChordShape = { muted: number[]; open: number[]; fingers: FingerPosition[]; baseFret?: number };

const CHORD_SHAPES: Record<string, ChordShape> = {
  C: { muted: [0], open: [2, 5], fingers: [{ string: 1, fret: 3, finger: 3 }, { string: 2, fret: 2, finger: 2 }, { string: 4, fret: 1, finger: 1 }] },
  G: { open: [2, 3, 4], muted: [], fingers: [{ string: 0, fret: 3, finger: 2 }, { string: 1, fret: 2, finger: 1 }, { string: 5, fret: 3, finger: 3 }] },
  Am: { muted: [0], open: [1, 5], fingers: [{ string: 2, fret: 2, finger: 2 }, { string: 3, fret: 2, finger: 3 }, { string: 4, fret: 1, finger: 1 }] },
  F: { muted: [0], open: [], fingers: [{ string: 1, fret: 3, finger: 3 }, { string: 2, fret: 3, finger: 4 }, { string: 3, fret: 2, finger: 2 }, { string: 4, fret: 1, finger: 1 }, { string: 5, fret: 1, finger: 1 }] },
  D: { muted: [0, 1], open: [3], fingers: [{ string: 2, fret: 2, finger: 1 }, { string: 4, fret: 2, finger: 2 }, { string: 5, fret: 3, finger: 3 }] },
  E: { muted: [], open: [0, 1, 5], fingers: [{ string: 2, fret: 2, finger: 2 }, { string: 3, fret: 2, finger: 3 }, { string: 4, fret: 1, finger: 1 }] },
};

export function ChordDiagram({ chord, compact = false }: { chord: string; compact?: boolean }) {
  const root = chord.replace(/[#bm0-9/()+-]/g, "") || "C";
  const shape = CHORD_SHAPES[root] || CHORD_SHAPES.C;
  const width = compact ? 126 : 156; const height = compact ? 170 : 205; const left = 23; const top = 38; const gridWidth = compact ? 90 : 110; const fretHeight = compact ? 21 : 26;
  const xFor = (string: number) => left + (gridWidth / 5) * string;
  const yFor = (fret: number) => top + (fret - .5) * fretHeight;
  return <svg className={compact ? "chord-diagram compact" : "chord-diagram"} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Diagram kord ${chord}`}><title>Diagram kord {chord}</title>{Array.from({ length: 6 }).map((_, string) => <g key={`label-${string}`}><text x={xFor(string)} y="17" textAnchor="middle" className="diagram-status">{shape.muted.includes(string) ? "×" : shape.open.includes(string) ? "○" : ""}</text><text x={xFor(string)} y={top + 5 * fretHeight + 16} textAnchor="middle" className="diagram-string-label">{6 - string}</text></g>)}<rect x={left} y={top} width={gridWidth} height="3" className="diagram-nut" />{Array.from({ length: 6 }).map((_, string) => <line key={`string-${string}`} x1={xFor(string)} y1={top} x2={xFor(string)} y2={top + 5 * fretHeight} className="diagram-string" />)}{Array.from({ length: 6 }).map((_, fret) => <line key={`fret-${fret}`} x1={left} y1={top + fret * fretHeight} x2={left + gridWidth} y2={top + fret * fretHeight} className="diagram-fret" />)}{shape.fingers.map((position, index) => <g key={`${position.string}-${position.fret}-${index}`}><circle cx={xFor(position.string)} cy={yFor(position.fret)} r={compact ? 8 : 10} className="diagram-finger" /><text x={xFor(position.string)} y={yFor(position.fret) + 3.5} textAnchor="middle" className="diagram-finger-label">{position.finger}</text></g>)}{[1,2,3,4,5].map((fret) => <text key={fret} x={left - 11} y={yFor(fret) + 3} textAnchor="middle" className="diagram-fret-label">{fret + (shape.baseFret || 0) - 1}</text>)}</svg>;
}
