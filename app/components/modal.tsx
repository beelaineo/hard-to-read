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
}

const Wrapper = styled.div<WithPulseState>`
  ${({ pulseState, width, height, zIndex, isMobile }) => css`
    width: ${isMobile ? 'auto' : width + 'px'};
    min-height: ${height}px;
    max-height: ${isMobile ? 'unset' : '90vh'};
    overflow-y: scroll;
    z-index: ${zIndex};
    background-color: ${pulseState ? 'red' : '#fff'};
    border: 1px solid;
    border-color: primary;
    margin: ${isMobile ? 4 : 0};
    position: ${isMobile ? 'static' : 'absolute'};
    pointer-events: all;
    cursor: grab;

    button {
      color: white;
      mix-blend-mode: difference;
    }
  `}
`

export default function Modal({ modal, i, count, zFloor, setZFloor }) {
  const { removeModal, pulseModal } = useModal()
  const { id, type, content } = modal

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
        : content._type == 'press'
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
    >
      <x.button
        appearance={'none'}
        right={5}
        top={5}
        position={'absolute'}
        bg={'transparent'}
        zIndex={2}
        onClick={() => handleCloseClick(modal)}
      >
        x
      </x.button>
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
      >
        <x.button
          appearance={'none'}
          right={5}
          top={5}
          position={'absolute'}
          bg={'transparent'}
          zIndex={2}
          onClick={() => handleCloseClick(modal)}
        >
          x
        </x.button>
        <ContentBlock
          content={modal.content}
          deltaPosition={deltaPosition}
          isDragging={isDragging}
        />
      </Wrapper>
    </Draggable>
  )
}
