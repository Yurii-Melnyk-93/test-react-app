import { Button } from "@/components/Button";
import type { CardProps } from "@/types/CardProps";
  
export function Card({ titleText, descriptionText }: CardProps) {
  return (
    <div className="card">
      <h2 className="card-title">{titleText}</h2>
      <p className="card-description">{descriptionText}</p>
      <Button buttonText="Click Me" onClick={() => console.log("Button clicked", titleText)} />
    </div>
  )
}