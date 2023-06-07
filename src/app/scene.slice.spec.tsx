import { Character, Location } from "../__generated__/graphql"
import { characters, locations } from "./feature"
import sceneReducer, { SceneState, addScene } from "./scene.slice"

describe("Scene slice", () => {
  const initialState: SceneState = {}

  it("should handle addScene", async () => {
    const actual = sceneReducer(
      initialState,
      addScene({
        episodeId: "1",
        scene: {
          location: locations[0] as Location,
          characters: characters as Character[],
          description: "abc",
        },
      })
    )

    expect(actual["1"].length).toBe(1)
  })
})
