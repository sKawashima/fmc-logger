'use client'

import { Link as LinkText, Paragraph } from 'evergreen-ui'
import Link from 'next/link'

export const GlobalFooter = () => {
  return (
    <footer>
      <Paragraph fontWeight="bold" textAlign="center">
        © 2021 FMC Logger
      </Paragraph>
      <Paragraph textAlign="center">
        Developed by{' '}
        <Link href="https://github.com/sKawashima/fmc-logger">
          <LinkText>sKawashima</LinkText>
        </Link>
      </Paragraph>
    </footer>
  )
}
