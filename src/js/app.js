import TaskApp from "./TaskApp";
import State from "./State";
import Render from "./Render";

const state = new State();
const render = new Render();

new TaskApp("#app", state, render);