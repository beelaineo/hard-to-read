import * as React from 'react'
import styled, { x, css } from '@xstyled/styled-components'
import { Modal } from '../interfaces'
import { modalize } from '../utils'
import { useModal } from '../providers/ModalProvider'

const { useEffect, useState } = React

const colors = [
  'rgba(252,118,106,1.0)',
  'rgba(91,132,177,1.0)',
  'rgba(95,75,139,1.0)',
  'rgba(230,154,141,1.0)',
  'rgba(66,234,221,1.0)',
  'rgba(205,181,153,1.0)',
  'rgba(0,164,204,1.0)',
  'rgba(249,87,0,1.0)',
  'rgba(0,32,63,1.0)',
  'rgba(173,239,209,1.0)',
  'rgba(96,96,96,1.0)',
  'rgba(214,237,23,1.0)',
  'rgba(237,43,51,1.0)',
  'rgba(216,90,127,1.0)',
  'rgba(44,95,45,1.0)',
  'rgba(151,188,98,1.0)',
  'rgba(0,83,156,1.0)',
  'rgba(238,164,127,1.0)',
  'rgba(0,99,178,1.0)',
  'rgba(156,195,213,1.0)',
  'rgba(209,152,197,1.0)',
  'rgba(224,197,104,1.0)',
  'rgba(203,206,145,1.0)',
  'rgba(234,115,141,1.0)',
  'rgba(177,98,78,1.0)',
  'rgba(92,200,215,1.0)',
  'rgba(16,24,32,1.0)',
  'rgba(242,170,76,1.0)',
  'rgba(160,120,85,1.0)',
  'rgba(212,185,150,1.0)',
  'rgba(25,81,144,1.0)',
  'rgba(162,162,161,1.0)',
  'rgba(250,208,201,1.0)',
  'rgba(110,110,109,1.0)',
  'rgba(45,41,38,1.0)',
  'rgba(233,75,60,1.0)',
  'rgba(218,160,61,1.0)',
  'rgba(97,98,71,1.0)',
  'rgba(67,94,85,1.0)',
  'rgba(214,65,97,1.0)',
  'rgba(203,206,145,1.0)',
  'rgba(118,82,139,1.0)',
  'rgba(0,107,56,1.0)',
  'rgba(16,24,32,1.0)',
  'rgba(215,196,158,1.0)',
  'rgba(52,49,72,1.0)',
  'rgba(223,101,137,1.0)',
  'rgba(60,16,83,1.0)',
  'rgba(221,65,50,1.0)',
  'rgba(158,16,48,1.0)',
  'rgba(75,135,139,1.0)',
  'rgba(208,28,31,1.0)',
  'rgba(28,28,27,1.0)',
  'rgba(206,74,126,1.0)',
  'rgba(0,177,210,1.0)',
  'rgba(253,219,39,1.0)',
  'rgba(121,192,0,1.0)',
  'rgba(255,127,65,1.0)',
  'rgba(189,127,55,1.0)',
  'rgba(161,57,65,1.0)',
  'rgba(0,35,156,1.0)',
  'rgba(225,6,0,1.0)',
]

export const PersonListing = ({ post }) => {
  const { addModals } = useModal()
  const [color, setColor] = useState<string>('')
  useEffect(() => setColor(colors[(colors.length * Math.random()) | 0]), [])
  const bgColor = color?.replace('1.0', '0.05')
  const bgColorHover = color?.replace('1.0', '0.15')

  const handleItemClick = (person) => {
    addModals([modalize(person)])
  }

  return (
    <x.div
      key={post._id}
      border={'1px solid ' + color}
      fontSize={{ _: 'md', md: 'md', xl: 'lg' }}
      bg={'#fff'}
    >
      {/* <Link href={`/events/${post.slug}`}> */}
      <x.a
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'100%'}
        onClick={() => handleItemClick(post)}
        textAlign={'center'}
        p={{ _: 2, md: 4 }}
        bg={{ _: bgColor, hover: bgColorHover }}
      >
        {post.title}
      </x.a>
      {/* </Link> */}
    </x.div>
  )
}
