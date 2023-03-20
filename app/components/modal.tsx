import * as React from 'react'
import styled, { x, css } from '@xstyled/styled-components'
import { useModal } from '../providers/ModalProvider'
import { useViewportSize } from '../utils'
import Draggable from 'react-draggable'
import { ContentBlock } from './content-block'
import { pageview } from '../lib/ga'

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

interface WithPulseState {
  pulseState: boolean
  width: number
  height: number
  zIndex: number
  isMobile?: boolean
  color?: string
  spineColor?: string
  type?: string
}

const Wrapper = styled.div<WithPulseState>`
  ${({
    pulseState,
    width,
    height,
    zIndex,
    isMobile,
    color,
    spineColor,
    type,
  }) => css`
    width: ${isMobile ? 'auto' : width + 'px'};
    min-height: ${height}px;
    max-height: ${isMobile ? 'unset' : '90vh'};
    overflow-y: scroll;
    z-index: ${zIndex};
    background-color: ${pulseState ? 'red' : '#fff'};
    border: 1px solid;
    border-color: ${spineColor ? spineColor : color ? color : 'primary'};
    margin: ${isMobile ? 4 : 0};
    position: ${isMobile ? 'static' : 'absolute'};
    pointer-events: all;
    cursor: grab;
    mix-blend-mode: ${type == 'theme' ? 'multiply' : 'normal'};

    button {
      color: ${spineColor ? spineColor : color ? color : 'primary'};
      position: absolute;
      right: 8px;
      border-color: none;
      border: none;
      top: 8px;
      appearance: none;
      z-index: 3;
      height: 2rem;
      width: 2rem;
      background-color: transparent;
      svg {
        margin-left: 0.4rem;
        margin-top: 0rem;
        height: 0.75rem;
        width: 0.75rem;
      }
      svg line {
        stroke: ${spineColor ? spineColor : color ? color : 'primary'};
      }
    }
    .button-bg {
      background-color: #fff;
      border-radius: 0 0 0 100%;
      position: absolute;
      right: -1px;
      top: -1px;
      appearance: none;
      position: absolute;
      z-index: 2;
      height: calc(2rem - 1px);
      width: calc(2rem - 1px);
    }
  `}
`

export default function Modal({ modal, i, count, zFloor, setZFloor }) {
  const { removeModal, pulseModal } = useModal()
  const { id, type, content, spineColor } = modal
  const color =
    modal?.type == 'event' && content?.event_program == 'pillowtalk'
      ? 'secondary'
      : modal.color
      ? modal.color
      : null
  // console.log('modal color', color)
  // console.log('modal content', modal)

  const [isDragging, setDragging] = useState(false)
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 })
  const [modalW, setModalW] = useState(270)
  const [modalH, setModalH] = useState(100)
  const [zIndex, setZIndex] = useState(i)
  const [randomColor, setRandomColor] = useState('')

  useEffect(() => {
    const slug = content?.slug?.current || content?.slug
    pageview(`/modal/${slug ? type + '/' + slug : type + '/' + id}`)
    if (zFloor > count) {
      setZIndex(zFloor + 1)
      setZFloor(zFloor + 1)
    }
    setModalW(
      content._type == 'event' || content._type == 'post'
        ? 480
        : content._type == 'press' ||
          content._type == 'partner' ||
          content._type == 'person'
        ? 320
        : content._type == 'book' || content._type == 'theme'
        ? 200
        : content._type == 'image'
        ? 480
        : content._type == 'video'
        ? 480
        : 120,
    )
    if (type == 'theme')
      setRandomColor(colors[Math.floor(Math.random() * colors.length)])
  }, [])

  const { width, height } = useViewportSize()

  const assignCoord = (axis) => {
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min
    const xMin = 16
    const xMax = width - modalW - 16
    const yMin = 48
    const yMax = height - modalH - 16
    if (axis == 'x') {
      return random(xMin, xMax)
    } else if (axis == 'y') {
      return random(yMin, yMax)
    }
  }

  const origin = {
    x: assignCoord('x'),
    y: assignCoord('y'),
  }

  const handleCloseClick = (modal) => {
    removeModal(modal)
  }

  const handleStart = () => {
    setTimeout(() => setDragging(true), 50)
    setZIndex(zFloor + 1)
    setZFloor(zFloor + 1)
  }

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition
    const obj = {
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    }
    setDeltaPosition(obj)
  }

  const handleStop = () => {
    setTimeout(() => setDragging(false), 50)
  }

  const [pulseState, setPulseState] = useState(false)

  useEffect(() => {
    if (pulseModal === id) {
      setPulseState(true)
      setZIndex(zFloor + 1)
      setZFloor(zFloor + 1)
    } else {
      setPulseState(false)
    }
  }, [pulseModal])

  return width < 640 ? (
    <Wrapper
      width={modalW}
      height={modalH}
      pulseState={pulseState}
      zIndex={zIndex}
      isMobile={true}
      color={color || randomColor}
      spineColor={spineColor}
      type={type}
    >
      <ContentBlock
        content={modal.content}
        deltaPosition={deltaPosition}
        isDragging={isDragging}
      />
    </Wrapper>
  ) : (
    <Draggable
      defaultPosition={{ x: origin.x, y: origin.y }}
      onStart={() => handleStart()}
      onStop={() => handleStop()}
      cancel="a"
    >
      <Wrapper
        width={modalW}
        height={modalH}
        pulseState={pulseState}
        zIndex={zIndex}
        color={color || randomColor}
        spineColor={spineColor}
        type={type}
      >
        {/* <x.div className="button-bg" /> */}
        <x.div position={'relative'}>
          <x.button onClick={() => handleCloseClick(modal)}>
            X
            {/* <svg
              viewBox="0 0 12 12"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="11"
                x2="11"
                y2="1"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="1"
                y1="1"
                x2="11"
                y2="11"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg> */}
          </x.button>
          <ContentBlock
            content={modal.content}
            deltaPosition={deltaPosition}
            isDragging={isDragging}
            color={color || randomColor}
          />
        </x.div>
      </Wrapper>
    </Draggable>
  )
}
