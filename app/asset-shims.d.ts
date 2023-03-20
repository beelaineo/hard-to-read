// svg-shim.d.ts
declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  export const ReactComponent: FC<SVGProps<SVGSVGElement>>

  const src: string
  export default src
}

declare module '*.png' {
  const content: any
  export default content
}
