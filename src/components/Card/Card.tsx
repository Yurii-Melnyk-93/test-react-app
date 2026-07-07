import { Button } from "@/components/Button";

export function Card() {
  return (
    <div className="card">
      <h2 className="card-title">Card Title</h2>
      <p className="card-description">This is a description of the card.</p>
      <Button buttonText="Click Me" />
    </div>
  )
}