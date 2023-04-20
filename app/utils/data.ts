import { isAbsoluteUrl } from 'next/dist/shared/lib/utils'
import { Maybe, Modal } from '../interfaces'

export const propByPath = (
  path: string | string[],
  obj: Record<string, any>,
) => {
  const propPath = typeof path === 'string' ? path.split('.') : path
  const [firstKey, ...rest] = propPath
  return rest.length ? propByPath(rest, obj[firstKey]) : obj[firstKey]
}

export function isDefined<T>(x: Maybe<T>): x is T {
  return x !== undefined && x !== null
}

export function definitely<T>(items?: Array<T | null | undefined> | null): T[] {
  if (!items) return []
  return items.filter((i): i is T => Boolean(i))
}

export const unique = <T>(array: T[]): T[] => {
  const set = new Set(array)
  return [...set]
}

export const modalize = (
  doc: any,
  color?: string,
  spineColor?: string,
  program?: 'hardtoread' | 'pillowtalk',
) => {
  console.log('modalize', doc)
  console.log('modalize', program)
  const pillowtalkColor = program == 'pillowtalk' ? 'secondary' : undefined
  const modalDoc: Modal = {
    id: doc._id || `modal-${doc.title}`,
    type: doc._type,
    content: doc,
    color: color || pillowtalkColor || undefined,
    spineColor: spineColor || undefined,
  }
  return modalDoc
}

export const modalizeImage = (image: any, color?: string) => {
  console.log('modalizeImage', image)
  const imageContent = {
    _type: 'image',
    asset: image,
  }
  console.log('modalizeImage IMAGE CONTENT', imageContent)
  const modalDoc: Modal = {
    id: image._id,
    type: image._type,
    //@ts-ignore
    content: imageContent,
    color: color || undefined,
  }
  return modalDoc
}

export const modalizeVideo = (video: any, color?: string) => {
  console.log('modalizeVideo', video)
  const videoContent = {
    _type: 'video',
    asset: video,
  }
  console.log('modalizeImage VIDEO CONTENT', videoContent)
  const modalDoc: Modal = {
    id: video._id,
    type: 'video',
    //@ts-ignore
    content: videoContent,
    color: color || undefined,
  }
  return modalDoc
}
