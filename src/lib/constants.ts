import { Category, Type } from '@/types'

export const TYPES = [
  {
    type: 'normal',
    color: '#919AA2'
  },
  {
    type: 'fighting',
    color: '#CE416B'
  },
  {
    type: 'flying',
    color: '#89AAE3'
  },
  {
    type: 'poison',
    color: '#B567CE'
  },
  {
    type: 'ground',
    color: '#D97845'
  },
  {
    type: 'rock',
    color: '#C5B78C'
  },
  {
    type: 'bug',
    color: '#91C12F'
  },
  {
    type: 'ghost',
    color: '#5269AD'
  },
  {
    type: 'steel',
    color: '#5A8EA2'
  },
  {
    type: 'fire',
    color: '#FF9D55'
  },
  {
    type: 'water',
    color: '#5090D6'
  },
  {
    type: 'grass',
    color: '#63BC5A'
  },
  {
    type: 'electric',
    color: '#F4D23C'
  },
  {
    type: 'psychic',
    color: '#FA7179'
  },
  {
    type: 'ice',
    color: '#73CEC0'
  },
  {
    type: 'dragon',
    color: '#0B6DC3'
  },
  {
    type: 'dark',
    color: '#5A5465'
  },
  {
    type: 'fairy',
    color: '#EC8FE6'
  },
  {
    type: 'unknown',
    color: ''
  },
  {
    type: 'shadow',
    color: ''
  }
]

export const TYPE_COLORS: Record<Type, string> = {
  一般: '#9fa19f',
  格斗: '#ff8000',
  飞行: '#81b9ef',
  毒: '#9141cb',
  地面: '#915121',
  岩石: '#afa981',
  虫: '#91a119',
  幽灵: '#704170',
  钢: '#60a1b8',
  火: '#e62829',
  水: '#2980ef',
  草: '#3fa129',
  电: '#fac000',
  超能力: '#ef4179',
  冰: '#3fd8ff',
  龙: '#5060e1',
  恶: '#50413f',
  妖精: '#ef70ef',
  未知: '#44685e'
}

export const CATEGORY_TYPE: Record<Category, string> = {
  物理: '#ff4400',
  特殊: '#2266cc',
  变化: '#999999'
}
