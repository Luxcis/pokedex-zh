'use client'

import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
  Handle,
  Node,
  NodeProps,
  Position,
  ReactFlow
} from '@xyflow/react'
import type { EvolutionChain as EvolutionChainType } from '@/types'
import Image from 'next/image'
import '@xyflow/react/dist/style.css'

type NodeData = {
  label: string
  stage: string
  text: string
  form: string
  image: string
}
type NodeType = Node<NodeData>

type EdgeData = {
  label: string
}

type EdgeType = Edge<EdgeData>

function CustomNode({ data }: NodeProps<NodeType>) {
  return (
    <>
      <Handle type='target' position={Position.Left} className='invisible' />
      <div className='flex w-[160px] flex-col items-center justify-center'>
        <Image
          src={`/images/dream/${data.image}`}
          alt={data.label}
          width={100}
          height={100}
        />
        <p className='mt-2 text-center text-sm'>{data?.label}</p>
        <p className='text-center text-sm'>{data?.form}</p>
        <p className='mt-2 rounded-full bg-muted px-2 text-center text-xs text-muted-foreground'>
          {data?.stage}
        </p>
      </div>
      <Handle type='source' position={Position.Right} className='invisible' />
    </>
  )
}

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data
}: EdgeProps<EdgeType>) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY
  })

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: '#ffcc00'
          }}
          className='nodrag nopan absolute w-[100px] text-center text-xs'
        >
          {data?.label}
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

interface Props {
  chains: EvolutionChainType[]
}

// export default function EvolutionChain({ chains }: Props) {
//   const { nodes, edges } = convertToGraph(chains)

//   const nodeTypes = {
//     pokemon: CustomNode
//   }

//   const edgeTypes = {
//     pokemon: CustomEdge
//   }

//   return (
//     <div
//       style={{
//         height: 400
//       }}
//     >
//       <ReactFlow
//         className='pointer-events-auto'
//         fitView
//         maxZoom={1}
//         // panOnDrag={false}
//         zoomOnDoubleClick={false}
//         zoomOnPinch={false}
//         zoomOnScroll={false}
//         nodeTypes={nodeTypes}
//         edgeTypes={edgeTypes}
//         nodes={nodes}
//         edges={edges}
//       />
//     </div>
//   )
// }
