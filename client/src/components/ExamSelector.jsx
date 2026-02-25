
export default function ExamSelector({ boards, subjects, board, subject, onBoardChange, onSubjectChange, onStart }) {
  return (
    <section className="selector-card">
      <h1>CBSE Exam Reels</h1>
      <p>Select board and subject to start practicing with reel-style questions.</p>
      <label>
        Exam
        <select value={board} onChange={(e) => onBoardChange(e.target.value)}>
          <option value="">Choose exam</option>
          {boards.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label>
        Subject
        <select value={subject} onChange={(e) => onSubjectChange(e.target.value)}>
          <option value="">Choose subject</option>
          {subjects.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label>
        Questions to load (external API)
        <input
          type="number"
          min="10"
          max="50"
          step="5"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
      </label>

      <button type="button" onClick={onStart} disabled={!board || !subject}>
        Start Reels
      </button>
    </section>
  );
}