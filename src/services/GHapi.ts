//Get data from the Github GraphQl api
import axios from "axios";

export default async function get_repos(userName: string, key: string) {
  try {
    const response = await axios.post(
      "https://api.github.com/graphql",
      {
        query: `{
              user(login: "${userName}") {
                pinnedItems(first: 6, types: REPOSITORY) {
                  nodes {
                    ... on RepositoryInfo {
                      name
                      description
                      url
                      createdAt
                      updatedAt
                      openGraphImageUrl
						          usesCustomOpenGraphImage
                      homepageUrl
                    }
                  }
                }
              }
            }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${key}`,
        },
      }
    );
    return response.data.data.user.pinnedItems.nodes;
  } catch (err) {
    console.log(
      "it was not possible to get the pinned repositories from github",
      err
    );
  }
}
