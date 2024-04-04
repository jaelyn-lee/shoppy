type Button = {
  text: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
export default function button({ text, onClick }: Button) {
  return (
    <button
      onClick={onClick}
      className="bg-main text-white rounded-xl px-4 py-2 hover:brightness-110"
    >
      {text}
    </button>
  )
}
