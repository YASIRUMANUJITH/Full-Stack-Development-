import Navbar from '../components/Navbar'
import Board from '../components/Board'
import mockBoard from '../data/mockData'

export default function BoardPage() {
  return (
    <div className="board-page">
      <Navbar />
      <Board board={mockBoard} />
    </div>
  )
}
