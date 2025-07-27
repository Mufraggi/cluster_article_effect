import { Workflow } from "@effect/workflow"
import { Effect, Schema } from "effect"

class CallApiPokemonError extends Schema.TaggedError<CallApiPokemonError>(
  "CallApiPokemonError"
)("CallApiPokemonError", {
  message: Schema.String
}) {}

const CallPokemonApiWorkFlow = Workflow.make({
  name: "CallPokemonApiWorkFlow",
  success: Schema.Void,
  error: CallApiPokemonError,
  payload: {
    id: Schema.String,
    pokemonId: Schema.String
  },
  idempotencyKey: ({ id }) => id
})

const makeCallPokemonApiWorkflowLogic = (payload: {
  id: string
  pokemonId: string
}, executionId: string) =>
  Effect.gen(function*() {
    yield* Effect.logDebug(`🔥 [${executionId}] Workflow démarré pour ce pokemon id${payload.pokemonId}`)
    if (payload.pokemonId.toString() === "3") {
      yield* new CallApiPokemonError({ message: "blablabal" })
    }
    console.log(`🔥 [${executionId}] Workflow démarré pour ce pokemon id${payload.pokemonId}`)
    return
  })

export { CallPokemonApiWorkFlow, makeCallPokemonApiWorkflowLogic }
