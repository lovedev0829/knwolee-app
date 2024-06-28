import { Box, Flex } from '@chakra-ui/react'
import { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Message } from '../../../utils/types'
import MessageBox from '../MessageBox'
import { PdfChatInput } from './PdfChatInput'

interface PdfChatProps {
  messages: Message[]
  loading: boolean
  onSend: (message: Message, files: FileList | null) => void
}

export const Header = styled.div`
  text-align: center;
  font-size: 64px;
  font-family: editor;
  @media (max-width: 480px) {
    font-size: 40px;
  }
`

export const PdfChat: FC<PdfChatProps> = ({ messages, loading, onSend }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo(0, messagesEndRef.current.scrollHeight)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Flex
        w='100%'
        h='100%'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Box
          className="scroll-hover"
          overflow={'auto'}
          ref={messagesEndRef}
        >
        {messages.map((message, index) => (
            <MessageBox key={index} message={message} />
          ))}
          {loading && (
            <Box justifyContent={'flex-start'}>
              <Box
                alignItems={'center'}
                bg={'#E7EFFE'}
                textColor={'black'}
                rounded={'2xl'}
                px={4}
                py={2}
                maxW={'67%'}
                overflowWrap={'anywhere'}
              >
                ...
              </Box>
            </Box>
          )}
        </Box>
        <Box mt={4}>
          <PdfChatInput onSend={onSend} disabled={loading} />
        </Box>
      </Flex>
    </>
  )
}
