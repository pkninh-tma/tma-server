const Message =
  `type Message {
    _id: ID!
    from: String
    to: String
    subject: String
    create_time: Int  
    type: String
  }`

const MessageInput =
  `input MessageInput {
    from: String
    to: String
    subject: String
    create_time: Int
    type: String
  }`


const MessageListResult =
  `type MessageListResult {
    items: [Message]
    total: Int
  }`

export default () => [
  Message,
  MessageInput,
  MessageListResult
]
