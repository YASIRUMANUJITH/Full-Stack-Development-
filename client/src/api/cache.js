import PouchDB from 'pouchdb-browser'

// Client-side persistence (project brief: at least one client-side mechanism).
// Every successful boards fetch is mirrored into IndexedDB via PouchDB, so the
// app can still render the last synced state when the network or API is down.
// WRITE queueing / sync-after-reconnect is the Session 5 milestone — this cache
// is intentionally read-only.
const db = new PouchDB('syncboard-cache')

export async function saveBoards(boards) {
  const existing = await db.allDocs()
  const revs = new Map(existing.rows.map((row) => [row.id, row.value.rev]))
  const docs = boards.map((board) => ({
    ...board,
    _id: board.id,
    ...(revs.has(board.id) ? { _rev: revs.get(board.id) } : {}),
  }))
  const stale = existing.rows
    .filter((row) => !boards.some((board) => board.id === row.id))
    .map((row) => ({ _id: row.id, _rev: row.value.rev, _deleted: true }))
  await db.bulkDocs([...docs, ...stale])
}

export async function loadBoards() {
  const result = await db.allDocs({ include_docs: true })
  return result.rows.map(({ doc }) => {
    const { _id, _rev, ...board } = doc
    return board
  })
}

export async function clearBoards() {
  const result = await db.allDocs()
  if (result.rows.length === 0) return
  await db.bulkDocs(result.rows.map((row) => ({ _id: row.id, _rev: row.value.rev, _deleted: true })))
}
