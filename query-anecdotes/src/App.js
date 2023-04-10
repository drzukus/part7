import { useQuery, useMutation, useQueryClient } from "react-query"
import { useNotifDispatch } from "./NotificationContext"
import { getAnecdotes, updateAnecdote } from "./requests"

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()

  const updateAnecMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnec) => {
      const anecdotes = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData("anecdotes", anecdotes.map(a => a.id === updatedAnec.id ? updatedAnec : a))
    }
  })

  const dispatch = useNotifDispatch()

  const handleVote = (anecdote) => {
    updateAnecMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({ type: "SET_NOTIF", payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => dispatch({ type: "REMOVE_NOTIF" }), 5000)
  }

  const result = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
