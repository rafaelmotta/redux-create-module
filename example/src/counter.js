import createModule from "./createModule";

const counter = createModule(0, {
  increment: (state, action) => state + 1,
  decrement: (state, action) => state - 1
});

export default counter.reducer;
export const actions = counter.actions;