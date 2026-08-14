/* RiffForge / chord card: diagram enam senar yang merespons chord aktif pada detail dan mode latihan. */
const positions: Record<string, number[]> = { C: [1, 2, 3], G: [1, 3, 4], Am: [1, 2, 3], F: [1, 2, 3], D: [1, 2, 3], E: [1, 2, 3] };

export function ChordDiagram({ chord, compact = false }: { chord: string; compact?: boolean }) {
  const markers = positions[chord.replace(/[#bm]/g, "")] || [1, 2, 3];
  return <div className={compact ? "chord-diagram compact" : "chord-diagram"} aria-label={`Diagram chord ${chord}`}><div className="chord-open-labels"><span>○</span><span>○</span><span>○</span><span>×</span></div><div className="chord-grid">{Array.from({ length: 18 }).map((_, index) => <span className={markers.includes(index + 1) ? "finger" : ""} key={index}>{markers.includes(index + 1) ? markers.indexOf(index + 1) + 1 : ""}</span>)}</div><div className="chord-strings-label">6 &nbsp; 5 &nbsp; 4 &nbsp; 3 &nbsp; 2 &nbsp; 1</div></div>;
}
