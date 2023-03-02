import * as React from 'react'
import ReactDOM from 'react-dom'
import MuxVideo from '@mux/mux-video-react'
import styled, { css } from '@xstyled/styled-components'
import { MuxVideoAsset } from '../interfaces'

const { useState, useRef, useEffect } = React

const Wrapper = styled.div`
  height: auto;
  position: relative;
  width: 100%;
  display: block;
  position: relative;
  padding: 0;
  line-height: 0;
`

const MuteControls = styled.div`
  position: absolute;
  top: 16;
  left: 16;
  z-index: 1;
  color: primary;
`

const FullscreenControls = styled.div`
  position: absolute;
  bottom: 16;
  right: 16;
  z-index: 1;
  color: primary;
`
const ResetControls = styled.div`
  position: absolute;
  bottom: 16;
  left: 16;
  z-index: 1;
  color: primary;
`

export const VideoBlock = ({ content, isDragging, deltaPosition }) => {
  const [muted, setMuted] = useState<boolean>(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { related } = content
  const { _id, assetId, playbackId, uploadId, status, data } = content.asset
  const { aspect_ratio, duration } = data

  console.log('VideoBlock', content)

  const handleClick = () => {
    if (isDragging === true) return
  }

  const handleMuteClick = () => {
    setMuted(!muted)
  }

  const handleFSClick = () => {
    const video = videoRef.current
    if (video?.requestFullscreen) video.requestFullscreen()
    // @ts-ignore
    else if (video?.webkitRequestFullscreen) video.webkitRequestFullscreen()
    // @ts-ignore
    else if (video?.msRequestFullScreen) video.msRequestFullScreen()
  }

  const handleResetClick = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
    video.play()
  }

  const handleVolumeChange = () => {
    const video = videoRef.current
    if (!video) return
    if (video.muted) setMuted(true)
    else setMuted(false)
  }

  return (
    <Wrapper>
      <MuteControls>
        <span onClick={() => handleMuteClick()}>
          {!muted ? 'sound off' : 'sound on'}
        </span>
      </MuteControls>
      <FullscreenControls>
        <span onClick={() => handleFSClick()}>fullscreen</span>
      </FullscreenControls>
      <ResetControls>
        <span onClick={() => handleResetClick()}>start over</span>
      </ResetControls>
      <MuxVideo
        ref={videoRef}
        style={{ height: '100%', maxWidth: '100%' }}
        playbackId={playbackId}
        metadata={{
          video_id: 'video-id-123456',
          video_title: 'Super Interesting Video',
          viewer_user_id: 'user-id-bc-789',
        }}
        streamType="on-demand"
        autoPlay
        muted={muted}
        loop
        onVolumeChange={() => handleVolumeChange()}
        onClick={() => handleClick()}
      />
    </Wrapper>
  )
}
