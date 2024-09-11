/** @jsxImportSource @emotion/react */

import React, { useState } from 'react'
import { css, keyframes } from '@emotion/react'

import { DotLoadingIcon } from '../icon/DotLoadingIcon'
import { LinkIcon } from '@heroicons/react/24/outline'

import isEqual from 'react-fast-compare'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const fade = keyframes`
  from { opacity: 0;}
  to { opacity: 1;}
`

const hyperLinkStyle = css`
  all: unset;
  overflow: hidden;
  border-radius: 0.25rem;
  border: solid 1px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  user-select: none;
  cursor: pointer;

  transition: opacity 200ms;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.6;
  }
`

const imageStyle = (isLoading: boolean) => css`
  display: flex;
  width: ${isLoading ? '0px' : '100%'};
  height: ${isLoading ? '0px' : '100%'};

  animation-name: ${fade};
  animation-duration: 200ms;
  animation-fill-mode: both;

  @media (min-width: 768px) {
    max-width: 35%;
    border-radius: 0.25rem 0 0 0.25rem;
  }
`

const imageFallbackStyle = (isLoading: boolean) => css`
  width: 100%;
  height: 128px;
  display: ${isLoading ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    max-width: 35%;
    border-radius: 0.25rem 0 0 0.25rem;
  }
`

const typographyStyle = css`
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`

const titleStyle = css`
  font-size: 1rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
`

const descriptionStyle = css`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
`

const linktextStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: nowrap;

  width: 100%;
  font-size: 0.8rem;
  color: rgba(42, 82, 141, 0.6);
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface BookmarkProps {
  title: string
  description: string
  url: string
  image: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const BookmarkComponent = ({
  description,
  title,
  url,
  image
}: BookmarkProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div>
      <a css={hyperLinkStyle} href={url} target='_blank' rel='nopager noopener'>
        <img
          css={imageStyle(isLoading)}
          key={String(isLoading)}
          src={image}
          alt={description}
          loading='lazy'
          onLoad={() => {
            setIsLoading(false)
          }}
        />

        <div css={imageFallbackStyle(isLoading)}>
          <DotLoadingIcon color={'rgba(128,128,128,0.9)'} />
        </div>

        <div css={typographyStyle}>
          <div css={titleStyle}>{title}</div>
          <div css={descriptionStyle}>{description}</div>
          <div css={linktextStyle}>
            <LinkIcon style={{ width: 16, height: 16 }} />
            <span>{url}</span>
          </div>
        </div>
      </a>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Bookmark = React.memo(BookmarkComponent, isEqual)
