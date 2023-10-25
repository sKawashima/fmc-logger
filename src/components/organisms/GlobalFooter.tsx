'use client'

import { Link as LinkText, Pane, Paragraph, majorScale } from 'evergreen-ui'

export const GlobalFooter = () => {
  return (
    <footer>
      <Pane marginTop={majorScale(4)}>
        <Paragraph fontWeight="bold" textAlign="center">
          © 2021 FMC Logger
        </Paragraph>
        <Paragraph textAlign="center">
          Developed by{' '}
          <LinkText
            href="https://github.com/sKawashima/fmc-logger"
            target="_blank"
            rel="noopener noreferrer"
          >
            sKawashima
          </LinkText>
        </Paragraph>
      </Pane>
    </footer>
  )
}
