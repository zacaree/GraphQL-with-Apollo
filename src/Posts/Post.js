import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import UpdatePost from './UpdatePost';
import EditMode from './EditMode';

export default class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query query={POST_QUERY} variables={{ id: match.params.id }}>
        {({ data, loading }) => {
          if (loading) return 'Loading...';
          const { post, isEditMode } = data;
          return (
            <div>
              <EditMode isEditMode={isEditMode} />
              {isEditMode ? (
                <section className="section__editPost">
                  <h1>Edit Post</h1>
                  <UpdatePost post={post} />
                </section>
              ) : (
                  <section>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    <label htmlFor="Checkeroo">
                      {/* Optimistic UI Example Below */}
                      <Mutation
                        // Here's our standatd mutation that talks to the GraphQL server.
                        mutation={UPDATE_POST}
                        variables={{
                          id: post.id,
                          check: !post.check
                        }}
                        // The optimistic response is the response you're expecting to get back from the above mutation.
                        // You anticipate so that you can display the changes before the response comes back from the server.
                        optimisticResponse={{
                          __typename: 'Mutation',
                          updatePost: {
                            __typename: 'Post',
                            check: !post.check
                          }
                        }}
                        update={(cache, { data: { updatePost } }) => {
                          // Here we're reading the cache and getting the current data from the cache.
                          const data = cache.readQuery({
                            query: POST_QUERY,
                            variables: {
                              id: post.id
                            }
                          });
                          // Here we're modifying the value of the checkbox,
                          // This value is coming into this function as an argument from updatePost above (from the optimisticResponse object).
                          data.post.check = updatePost.check;
                          // Now we need to write this current data into our Apollo cache
                          cache.writeQuery({
                            query: POST_QUERY,
                            data: {
                              ...data,
                              post: data.post,
                            }
                          })
                        }}
                      >
                        {updatePost => (
                          <input
                            style={{ zoom: '2' }}
                            type="checkbox"
                            id="Checkeroo"
                            checked={post.check}
                            onChange={updatePost}
                          />
                        )}
                      </Mutation>
                      Checkbox powered by Optimistic UI!
                    </label>
                  </section>
                )}
            </div>
          )
        }}
      </Query>
    )
  }
}

// Grabbing a specific post based on the url params (params are equal to the post id).
// For a refresher on how this works, watch GraphQL with Apollo lesson 10 – Scott Tolinski
const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
      check
    }
    isEditMode @client
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $check: Boolean) {
    updatePost(
      where: {
        id: $id
      }
      data: {
        check: $check
      }
    ) {
      # title
      # body
      # id
      check
    }
  }
`;

