import { Card } from '@/components/Card'

export function CardsList() {
  const cardsData = [
    { titleText: 'Card 1', descriptionText: 'This is the first card' },
    { titleText: 'Card 2', descriptionText: 'This is the second card' },
    { titleText: 'Card 3', descriptionText: 'This is the third card' },
  ]

  return (
    <div className="cards-list">
      {cardsData.map((card, index) => (
        <Card key={index} titleText={card.titleText} descriptionText={card.descriptionText} />
      ))}
    </div>
  )
}