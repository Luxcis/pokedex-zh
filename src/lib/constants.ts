import {
  Category,
  categorySchema,
  generationSchema,
  Order,
  orderSchema,
  Type,
  typeSchema
} from '@/types'

export const ORDERS = orderSchema.options

export const ORDER_LABEL: Record<Order, string> = {
  asc: '顺序',
  desc: '倒序'
}

export const TYPES = typeSchema.options

export const CATEGORIES = categorySchema.options

export const GENERATIONS = generationSchema.options

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
  未知: '#676767'
}

export const CATEGORY_TYPE: Record<Category, string> = {
  物理: '#ff4400',
  特殊: '#2266cc',
  变化: '#999999'
}

const Z = 0
const O = 1
const H = 0.5
const D = 2

export const TYPE_TABLE: number[][] = [
  [O, O, O, O, O, O, O, O, O, O, O, O, H, Z, O, O, H, O],
  [O, H, H, O, D, D, O, O, O, O, O, D, H, O, H, O, D, O],
  [O, D, H, O, H, O, O, O, D, O, O, O, D, O, H, O, O, O],
  [O, O, D, H, H, O, O, O, Z, D, O, O, O, O, H, O, O, O],
  [O, H, D, O, H, O, O, H, D, H, O, H, D, O, H, O, H, O],
  [O, H, H, O, D, H, O, O, D, D, O, O, O, O, D, O, H, O],
  [D, O, O, O, O, D, O, H, O, H, H, H, D, Z, O, D, D, H],
  [O, O, O, O, D, O, O, H, H, O, O, O, H, H, O, O, Z, D],
  [O, D, O, D, H, O, O, D, O, Z, O, H, D, O, O, O, D, O],
  [O, O, O, H, D, O, D, O, O, O, O, D, H, O, O, O, H, O],
  [O, O, O, O, O, O, D, D, O, O, H, O, O, O, O, Z, H, O],
  [O, H, O, O, D, O, H, H, O, H, D, O, O, H, O, D, H, H],
  [O, D, O, O, O, D, H, O, H, D, O, D, O, O, O, O, H, O],
  [Z, O, O, O, O, O, O, O, O, O, D, O, O, D, O, H, O, O],
  [O, O, O, O, O, O, O, O, O, O, O, O, O, O, D, O, H, Z],
  [O, O, O, O, O, O, H, O, O, O, D, O, O, D, O, H, O, H],
  [O, H, H, H, O, D, O, O, O, O, O, O, D, O, O, O, H, D],
  [O, H, O, O, O, O, D, H, O, O, O, O, O, O, D, D, H, O]
]
