const Document =
  `type Document {
    _id: ID!
    name: String
    description: String
    type: String
    create_time: Int
    status: String
    version: String
    url: String
  }`

const DocumentInput = 
  `input DocumentInput {
    name: String
    description: String
    type: String
    create_time: Int
    status: String
    version: String    
  }`


const DocumentListResult =  
  `type DocumentListResult {
    items: [Document]
    total: Int
  }`

export default () => [
  Document,
  DocumentInput,
  DocumentListResult
]
