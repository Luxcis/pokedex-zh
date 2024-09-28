'use client'

import React from 'react'
import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
  getSmoothStepPath,
  getStraightPath,
  Handle,
  Node,
  NodeProps,
  Position,
  ReactFlow
} from '@xyflow/react'
import type { EvolutionChain as EvolutionChainType } from '@/types'
import '@xyflow/react/dist/style.css'
import Image from 'next/image'

function CustomNode({ data }: NodeProps) {
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
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
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

export default function EvolutionChain({ chains }: Props) {
  const { nodes, edges } = convertToGraph(chains)
  const maxHeight = Math.max(...nodes.map((n) => n.position.y))

  const nodeTypes = {
    pokemon: CustomNode
  }

  const edgeTypes = {
    pokemon: CustomEdge
  }

  return (
    <div
      style={{
        height: maxHeight
      }}
    >
      <ReactFlow
        className='pointer-events-auto'
        fitView
        maxZoom={1}
        // panOnDrag={false}
        zoomOnDoubleClick={false}
        // zoomOnPinch={false}
        // zoomOnScroll={false}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
      />
    </div>
  )
}

function convertToGraph(data: EvolutionChainType[]) {
  const nodes: Node[] = []
  const edges: Edge[] = []
  let id = 1 // 唯一ID计数器

  let maxY = 0
  data.forEach((group, groupIndex) => {
    let stageZeroCount = 0
    let stageOneCount = 0
    let stageTwoCount = 0

    let currentMaxY = 0
    group.forEach((pokemon, index) => {
      // 创建节点
      let x = 0
      let y = 0
      switch (pokemon.stage) {
        case '1阶进化':
          x = 300 * 1
          stageOneCount += 1
          y = 200 * (stageOneCount - 1) + 200 * (groupIndex + 1) + maxY
          console.log('111111', stageOneCount - 1, groupIndex + 1, maxY, y)
          break
        case '2阶进化':
          x = 300 * 2
          stageTwoCount += 1
          y = 200 * (stageTwoCount - 1) + 200 * (groupIndex + 1) + maxY
          break

        default:
          stageZeroCount += 1
          y = 200 * (groupIndex + 1) + maxY
          break
      }
      currentMaxY = Math.max(currentMaxY, y)

      nodes.push({
        id: pokemon.name + (pokemon.form_name ? ` (${pokemon.form_name})` : ''),
        type: 'pokemon',
        data: {
          label: pokemon.name,
          stage: pokemon.stage,
          form: pokemon.form_name,
          text: pokemon.text,
          image: pokemon.image
        },
        position: { x: x, y: y }
      })

      // 创建连线
      if (pokemon.from) {
        edges.push({
          id: `e${id++}`,
          type: 'pokemon',
          source:
            pokemon.from + (pokemon.form_name ? ` (${pokemon.form_name})` : ''),
          target:
            pokemon.name + (pokemon.form_name ? ` (${pokemon.form_name})` : ''),
          data: {
            label: pokemon.text || ''
          }
        })
      }
    })

    maxY = Math.max(maxY, currentMaxY)
  })

  return { nodes, edges }
}
