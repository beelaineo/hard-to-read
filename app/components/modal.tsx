import * as React from 'react'
import styled, { x, css } from '@xstyled/styled-components'
import { useModal } from '../providers/ModalProvider'
import { useViewportSize } from '../utils'
import Draggable from 'react-draggable'
import { ContentBlock } from './content-block'
import { pageview } from '../lib/ga'

const { useEffect, useState } = React

interface WithPulseState {
  pulseState: boolean
  width: number
  height: number
  zIndex: number
  isMobile?: boolean
  color?: string
}

const Wrapper = styled.div<WithPulseState>`
  ${({ pulseState, width, height, zIndex, isMobile, color }) => css`
    width: ${isMobile ? 'auto' : width + 'px'};
    min-height: ${height}px;
    max-height: ${isMobile ? 'unset' : '90vh'};
    overflow-y: scroll;
    z-index: ${zIndex};
    background-color: ${pulseState ? 'red' : '#fff'};
    border: 1px solid;
    border-color: ${color ? color : 'primary'};
    margin: ${isMobile ? 4 : 0};
    position: ${isMobile ? 'static' : 'absolute'};
    pointer-events: all;
    cursor: grab;

    button {
      color: ${color ? color : 'primary'};
      background-color: ${color && color == 'secondary'
        ? 'secondary20'
        : color
        ? color.replace('1.0', '0.2')
        : 'primary20'};
      border-radius: 0 0 0 100%;
      position: absolute;
      right: -1px;
      border-color: ${color ? color : 'primary'};
      border: 1px solid;
      top: -1px;
      appearance: none;
      position: absolute;
      z-index: 3;
      height: 2rem;
      width: 2rem;
      svg {
        margin-left: 0.4rem;
        margin-top: 0rem;
        height: 0.75rem;
        width: 0.75rem;
      }
      svg line {
        stroke: ${color ? color : 'primary'};
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
  const { id, type, content } = modal
  console.log('modal content', content)
  const color =
    modal?.type == 'event' && content?.event_program == 'pillowtalk'
      ? 'secondary'
      : modal.color
      ? modal.color
      : null
  console.log('modal color', color)

  console.log('modal content', modal)

  const [isDragging, setDragging] = useState(false)
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 })
  const [modalW, setModalW] = useState(270)
  const [modalH, setModalH] = useState(100)
  const [zIndex, setZIndex] = useState(i)

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
        : content._type == 'image'
        ? 480
        : content._type == 'video'
        ? 480
        : 120,
    )
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
      color={color}
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
    >
      <Wrapper
        width={modalW}
        height={modalH}
        pulseState={pulseState}
        zIndex={zIndex}
        color={color}
      >
        <x.button onClick={() => handleCloseClick(modal)}>
          <svg
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
          </svg>
        </x.button>
        <x.div className="button-bg" />
        <ContentBlock
          content={modal.content}
          deltaPosition={deltaPosition}
          isDragging={isDragging}
          color={color}
        />
      </Wrapper>
    </Draggable>
  )
}
