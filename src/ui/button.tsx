type Button = {
  text: string | boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  type?: 'submit'
}
export default function Button({ text, onClick, type }: Button) {
  return (
    <button
      onClick={onClick}
      className="bg-main text-white rounded-xl px-4 py-2 hover:brightness-110"
      type={type}
    >
      {text}
    </button>
  )
}
