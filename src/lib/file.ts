import path from 'path'
import { promises as fs } from 'fs'

export async function readFile<T>(jsonPath: string) {
  const filePath = path.join(process.cwd(), `/data/${jsonPath}`)

  const fileContents = await fs.readFile(filePath, 'utf8')
  return JSON.parse(fileContents) as T
}

export async function findFile(name: string, directoryName: string) {
  const directoryPath = path.join(process.cwd(), `/data/${directoryName}`)
  const files = await fs.readdir(directoryPath)
  const matchedFile = files.find((file) => {
    const pName = file.split('-')[1]
    return pName.startsWith(name)
  })
  return matchedFile
}
