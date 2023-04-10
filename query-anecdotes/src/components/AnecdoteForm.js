import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotifDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotifDispatch()

  const newAnecMutation = useMutation(createAnecdote, {
    onSuccess: (newAnec) => {
      const anecdotes = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnec))
    },
    onError: () => {
      dispatch({ type: "SET_NOTIF", payload: "too short anecdote, must have length 5 or more" })
      setTimeout(() => dispatch({ type: "REMOVE_NOTIF" }), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecMutation.mutate({ content, votes: 0 })
    dispatch({ type: "SET_NOTIF", payload: `anecdote '${content}' created` })
    setTimeout(() => dispatch({ type: "REMOVE_NOTIF" }), 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
