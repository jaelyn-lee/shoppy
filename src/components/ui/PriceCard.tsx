interface PriceCard {
  text: string
  price: string | number
}

export default function PriceCard({ text, price }: PriceCard) {
  return (
    <div className="flex flex-col w-40 h-16 text-center items-center justify-center bg-background rounded-xl">
      <p>{text}</p>
      <p className="font-semibold text-main text-lg">{price}</p>
    </div>
  )
}
