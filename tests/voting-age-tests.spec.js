import { test, expect } from "@playwright/test";
import { getVotingMessage } from './voting-age.spec'

test('"Ви ще не можете голосувати." коли вік менше 18', () => {
   expect(getVotingMessage(17)).toBe("Ви ще не можете голосувати.")
});

test('"Ви можете голосувати." коли вік = 18', () => {
   expect(getVotingMessage(18)).toBe("Ви можете голосувати.")
});

test('"Ви можете голосувати." коли вік більше 18', () => {
   expect(getVotingMessage(19)).toBe("Ви можете голосувати.")
});

