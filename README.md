This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Poker Validator

Welcome to the Poker Validator project! This application leverages a cloud function to handle poker hand validation seamlessly within a Next.js app. Below are key insights into the functionality and design considerations of this API:

## Functionality Highlights:

1. **Scalable Hand Evaluation:**
   - The server API effortlessly ranks and orders poker hands, accommodating any number of hands inputted. While the client app typically sends only two hands, the backend logic is designed to handle scenarios with varying numbers of players in a game. Refer to the implementation in `functions/src/validator/evaluateHands.ts`.

2. **Sophisticated Scoring System:**
   - Hand scoring is primarily based on the hand type, with additional heuristic scores to differentiate between hands of the same type. For example, a straight flush is prioritized over a four of a kind. Specific scoring heuristics are tailored for each hand type and can be explored in `functions/src/validator/scoringHeuristics.ts`.

3. **Tie Resolution Flexibility:**
   - The API seamlessly handles ties by returning all hands rank-ordered. It is the responsibility of the client application to inspect the list and determine ties by comparing the type and score of the first element with subsequent elements. This approach enhances flexibility and can be reviewed in `app/components/winner.tsx`.

4. **Robust Testing Suite:**
   - The project includes comprehensive test cases covering hands, scoring heuristics (though not exhaustive), and validation processes. Explore the test files located at `functions/src/validator/*.test.ts` and `functions/src/deal/*.test.ts`.

5. **Optimized Execution:**
   - While the interface may not appear lightning-fast, the majority of wait time is attributed to button debounce. On Firebase, execution time for evaluating hands is distributed with approximately 50% of responses within 5ms and the remaining below 8ms.

6. **Stateless Design:**
   - The application operates without a persistent deck, adhering to a stateless design. This decision aligns with the goal of maintaining the function's autonomy.

7. **Continuous Learning:**
   - Although not an expert in poker, thorough research was conducted on various hand-scoring methodologies after receiving the assignment. This ensured a comprehensive understanding of different scoring paradigms.

Feel free to explore the codebase and leverage the provided functionalities. Any feedback or contributions are welcome. Thank you for your interest in the Poker Validator project!

