const { gql } = require('apollo-server-express');

module.exports = gql`
  enum ContentType {
    TEXT
    VIDEO
    AUDIO
  }

  type Article {
    id: ID!
    title: String!
    content: String
    category: String
    type: ContentType
    mediaUrl: String
    duration: Int
    theme: String
    date: String
    allowDownload: Boolean
    comments: [Comment]
  }

  type Comment {
    id: ID!
    userName: String!
    message: String!
    date: String!
  }

  input ArticleInput {
    title: String!
    content: String
    category: String
    type: ContentType
    mediaUrl: String
    duration: Int
    theme: String
    date: String
    allowDownload: Boolean
  }

  input CommentInput {
    articleId: ID!
    userName: String!
    message: String!
  }

  type Query {
    articles(keyword: String, category: String, type: ContentType, theme: String): [Article]
    article(id: ID!): Article
  }

  type Mutation {
    createArticle(input: ArticleInput!): Article
    deleteArticle(id: ID!): Boolean
    createComment(input: CommentInput!): Comment
  }
`;
