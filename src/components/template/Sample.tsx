import React, { useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'

import { codeToHtml } from 'shiki'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const SampleComponent = () => {
  const [html, setHtml] = useState('')

  useEffect(() => {
    const renderCode = async () => {
      try {
        const generatedHtml = await codeToHtml(
          'console.log("Hi, Shiki on CDN :)")',
          {
            lang: 'js',
            theme: 'rose-pine'
          }
        )

        setHtml(generatedHtml)
      } catch (error) {
        console.error('Failed to load Shiki:', error)
      }
    }

    renderCode()
  }, [])

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Sample = React.memo(SampleComponent, isEqual)
