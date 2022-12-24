import * as React from 'react'
import ReactDOM from 'react-dom'
import MuxVideo from '@mux/mux-video-react'
import styled, { css } from '@xstyled/styled-components'
import { MuxVideoAsset } from '../interfaces'

const { useState } = React

const Wrapper = styled.div`
  height: auto;
  position: relative;
  width: 100%;
  display: block;
  position: relative;
  padding: 0;
  line-height: 0;
`

export const VideoBlock = ({ content, isDragging, deltaPosition }) => {
  const [muted, setMuted] = useState<boolean>(true)

  const { related } = content
  const { _id, assetId, playbackId, uploadId, status, data } = content.asset
  const { aspect_ratio, duration } = data

  const handleClick = () => {
    if (isDragging === true) return
    setMuted(!muted)
  }

  return (
    <Wrapper>
      <MuxVideo
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
        onClick={() => handleClick()}
      />
    </Wrapper>
  )
}
