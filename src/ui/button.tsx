type Button = {
  text: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
export default function button({ text, onClick }: Button) {
  return (
    <button
      onClick={onClick}
      className="border-2 bg-tertiary border-tertiary text-white rounded-xl px-3 py-1"
    >
      {text}
    </button>
  )
}
