import React from 'react'
import { type LanguageIconSvgProps } from './Props'

export const Go = React.memo(
  ({ size = '20px', color }: LanguageIconSvgProps) => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 128 128'
      >
        <g fill={color ?? '#00acd7'} fill-rule='evenodd'>
          <path d='M11.156 54.829c-.243 0-.303-.122-.182-.303l1.273-1.637c.12-.182.424-.303.666-.303H34.55c.243 0 .303.182.182.364l-1.03 1.576c-.121.181-.424.363-.606.363zm-9.152 5.575c-.242 0-.303-.12-.182-.303l1.273-1.636c.121-.182.424-.303.667-.303h27.636c.242 0 .364.182.303.364l-.485 1.454c-.06.243-.303.364-.545.364zM16.67 65.98c-.242 0-.302-.182-.181-.364l.848-1.515c.122-.182.364-.363.607-.363h12.12c.243 0 .364.181.364.424l-.12 1.454c0 .243-.243.425-.425.425zm62.91-12.242c-3.819.97-6.425 1.697-10.182 2.666c-.91.243-.97.303-1.758-.606c-.909-1.03-1.576-1.697-2.848-2.303c-3.819-1.878-7.516-1.333-10.97.91c-4.121 2.666-6.242 6.605-6.182 11.514c.06 4.849 3.394 8.849 8.182 9.516c4.121.545 7.576-.91 10.303-4c.545-.667 1.03-1.394 1.636-2.243H56.064c-1.272 0-1.575-.788-1.151-1.818c.788-1.879 2.242-5.03 3.09-6.606c.183-.364.607-.97 1.516-.97h22.06c-.12 1.637-.12 3.273-.363 4.91c-.667 4.363-2.303 8.363-4.97 11.878c-4.364 5.758-10.06 9.333-17.273 10.303c-5.939.788-11.454-.364-16.302-4c-4.485-3.394-7.03-7.879-7.697-13.454c-.788-6.606 1.151-12.546 5.151-17.758c4.303-5.636 10-9.212 16.97-10.485c5.697-1.03 11.151-.363 16.06 2.97c3.212 2.121 5.515 5.03 7.03 8.545c.364.546.122.849-.606 1.03z' />
          <path
            fill-rule='nonzero'
            d='M99.64 87.253c-5.515-.122-10.546-1.697-14.788-5.334c-3.576-3.09-5.818-7.03-6.545-11.697c-1.091-6.848.787-12.909 4.909-18.302c4.424-5.819 9.757-8.849 16.97-10.122c6.181-1.09 12-.484 17.272 3.091c4.788 3.273 7.757 7.697 8.545 13.515c1.03 8.182-1.333 14.849-6.97 20.546c-4 4.06-8.909 6.606-14.545 7.757c-1.636.303-3.273.364-4.848.546m14.424-24.485c-.06-.788-.06-1.394-.182-2c-1.09-6-6.606-9.394-12.363-8.06c-5.637 1.272-9.273 4.848-10.606 10.545c-1.091 4.727 1.212 9.515 5.575 11.454c3.334 1.455 6.667 1.273 9.879-.363c4.788-2.485 7.394-6.364 7.697-11.576'
          />
        </g>
      </svg>
    )
  }
)
