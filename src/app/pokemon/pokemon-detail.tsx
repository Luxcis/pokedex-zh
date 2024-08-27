import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

function PokemonDetail({ className }: Props) {
  return <div className={cn(className, 'flex-grow ')}>pokemon-detail</div>
}

export default PokemonDetail
