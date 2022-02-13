import { BASE_LINK } from '../../services/constants';
import authStore from '../../store/authStore';
import { Difficulty } from '../enum';
import { IBodyWord } from '../interfaces';

export async function getWordInfo(token: string) {
  const url = `${BASE_LINK}users/${authStore.userId}/words/${token}`;
  const headers = new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` });

  const res = await fetch(url, { headers });
  if (res.ok) {
    return res.json();
  }
  return false;
}

const GOOD_HARD_SCORE = 5;
const GOOD_NORMAL_SCORE = 3;

export function updateBody(win: boolean, body?: IBodyWord) {
  const currentBody = body || {
    difficulty: Difficulty.normal,
    optional: { streak: 0, wins: 0, losses: 0, learned: false },
  };
  if (win) {
    currentBody.optional.streak += 1;
    currentBody.optional.wins += 1;
  } else {
    currentBody.optional.streak = 0;
    currentBody.optional.losses += 1;
    currentBody.optional.learned = false;
  }

  const countWins = currentBody.optional.streak;
  const { difficulty } = currentBody;
  const canHard = countWins >= GOOD_HARD_SCORE && difficulty === Difficulty.hard;
  const canNormal = countWins >= GOOD_NORMAL_SCORE && difficulty === Difficulty.normal;

  if (canHard || canNormal) {
    currentBody.optional.learned = true;
    currentBody.difficulty = Difficulty.normal;
  }
  return currentBody;
}
