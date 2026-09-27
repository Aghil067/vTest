export function CapabilityList({ items }: { items: string[] }) {
  return (
    <ol className="capability-list">
      {items.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}
    </ol>
  );
}

export function OutcomeList({ items }: { items: string[] }) {
  return (
    <ul className="outcome-list">
      {items.map((item, index) => (
        <li key={`${index}-${item}`}><span>{item}</span></li>
      ))}
    </ul>
  );
}

export function ApplicationList({ items }: { items: string[] }) {
  return (
    <ul className="application-list">
      {items.map((item, index) => (
        <li key={`${index}-${item}`}>{item}</li>
      ))}
    </ul>
  );
}
