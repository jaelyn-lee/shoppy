export default function Banner() {
  return (
    <section className="h-96 bg-black relative w-full">
      <div className="w-full h-full bg-cover bg-banner bg-bottom opacity-55"></div>
      <div className="absolute w-full top-32 text-center text-white drop-shadow-md">
        <h2 className="text-6xl">Shop with us</h2>
        <p className="text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
          quod.
        </p>
      </div>
    </section>
  )
}
