/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

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

const imageStyle = css`
  height: 100%;

  @media (min-width: 768px) {
    height: 100%;
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
  return (
    <div>
      <a css={hyperLinkStyle} href={url} target='_blank' rel='nopager noopener'>
        <img css={imageStyle} src={image} alt={description} />
        <div css={typographyStyle}>
          <div css={titleStyle}>{title}</div>
          <div css={descriptionStyle}>{description}</div>
          <div css={linktextStyle}>
            <FontAwesomeIcon icon={faLink} />
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

export const Bookmark = React.memo(BookmarkComponent)
