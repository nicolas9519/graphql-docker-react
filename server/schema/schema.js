const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const { Book, Author } = require('../models');


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent) {
        const author = await Author.findById(parent.authorId);
        return author;
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent) {
        const books = await Book.find({ authorId: parent.id });
        return books;
      }
    }
  })
});

const RooTQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const book = await Book.findById(args.id);
        return book;
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const author = await Author.findById(args.id);
        return author;
      }
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve() {
        const books = await Book.find();
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve() {
        const authors = await Author.find();
        return authors;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        const newAuthor = await Author.create(args);
        return newAuthor;
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args) {
        const author = await Author.findById(args.authorId);
        if (!author) throw new Error('The author does not exist');
        const book = await Book.create(args);
        return book;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RooTQuery,
  mutation: Mutation
});
