const SUBJECT_TO_CATEGORY = {
  Mathematics: 19,
  Science: 17,
  Physics: 17,
  Biology: 17,
  Chemistry: 17,
  History: 23,
  Geography: 22,
  English: 10
};

const decodeEntity = (value) =>
  value
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&eacute;", "é");

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

export const fetchExternalQuestions = async ({ board, subject, amount = 20 }) => {
  const category = SUBJECT_TO_CATEGORY[subject] || 17;
  const total = Math.min(Number(amount) || 20, 50);
  const params = new URLSearchParams({
    amount: String(total),
    category: String(category),
    type: "multiple"
  });

  const response = await fetch(`https://opentdb.com/api.php?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`External API failed with ${response.status}`);
  }

  const payload = await response.json();
  if (!payload?.results?.length) {
    return [];
  }

  return payload.results.map((item, index) => {
    const correct = decodeEntity(item.correct_answer);
    const options = shuffle([
      correct,
      ...item.incorrect_answers.map((answer) => decodeEntity(answer))
    ]).map((text, optionIndex) => ({
      id: String.fromCharCode(65 + optionIndex),
      text
    }));

    const correctOptionId = options.find((option) => option.text === correct)?.id || "A";

    return {
      _id: `external-${Date.now()}-${index}`,
      examBoard: board || "CBSE 10th",
      subject: subject || "Science",
      questionText: decodeEntity(item.question),
      options,
      correctOptionId,
      source: "OpenTDB"
    };
  });
};
