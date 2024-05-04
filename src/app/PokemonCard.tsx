import Image from 'next/image'

interface Props {
  no: number
  name: string
  types: string[]
}
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork
// raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/394.png
export default function PokemonCard({ no, name, types }: Props) {
  return (
    <div className='flex h-[360px] w-[320px] flex-col items-center rounded-md bg-slate-50 p-4'>
      <Image
        alt={name}
        width={140}
        height={140}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${no}.png`}
      />
      <span className='text-base'>{name}</span>
      <span className='text-base'>#{no}</span>
    </div>
  )
}
