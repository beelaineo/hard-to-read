import styled, { x, css } from '@xstyled/styled-components'
import * as React from 'react'

export default function PostHeader({ title, date }) {
  const formattedDate = new Date(date).toLocaleDateString()
  return (
    <x.header pb={4}>
      <x.h1 mb={1} fontSize={'4xl'}>
        {title}
      </x.h1>
      <x.p fontSize={'lg'}>{formattedDate}</x.p>
    </x.header>
  )
}
