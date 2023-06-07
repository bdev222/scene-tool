import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Character, Location } from "../__generated__/graphql"
import { v4 as uuid } from "uuid"
import { RootState } from "./store"

export type Scene = { id: string; location: Location; characters: Character[]; description: string }

export type SceneState = Record<string, Scene[]>

const initialState: SceneState = {}

const sceneSlice = createSlice({
  name: "scene",
  initialState,
  reducers: {
    addScene: (state, action: PayloadAction<{ episodeId: string; scene: Omit<Scene, "id"> }>) => {
      const { episodeId, scene } = action.payload
      if (!state[episodeId]) {
        state[episodeId] = []
      }
      state[episodeId].push({ id: uuid(), ...scene })
    },
    removeScene: (state, action: PayloadAction<{ episodeId: string; sceneId: string }>) => {
      const { episodeId, sceneId } = action.payload
      state[episodeId] = state[episodeId].filter((scene) => scene.id !== sceneId)
    },
    updateScene: (
      state,
      action: PayloadAction<{ episodeId: string; sceneId: string; updates: Partial<Scene> }>
    ) => {
      const { episodeId, sceneId, updates } = action.payload
      const sceneIndex = state[episodeId]?.findIndex((scene) => scene.id === sceneId)
      if (sceneIndex > -1) {
        state[episodeId][sceneIndex] = { ...state[episodeId][sceneIndex], ...updates }
      }
    },
  },
})

export const selectScenesByEpisode = (episodeId: string) => (state: RootState) =>
  state.scene[episodeId]
export const selectSceneByIdAndEpisode =
  (episodeId: string, sceneId: string) => (state: RootState) =>
    state.scene[episodeId]?.find((scene) => scene.id === sceneId)

export const { addScene, removeScene, updateScene } = sceneSlice.actions

export default sceneSlice.reducer
