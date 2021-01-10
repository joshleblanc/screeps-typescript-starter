import { ErrorMapper } from "utils/ErrorMapper";

declare global {
  // Example typings, expand on these or remove them and add your own.
  // Note: these do no actually *exists* by default, you must implement them if you would like to use them.

  // Types added in this `global` block are in an "ambient" context. It's needed because this is a module file (uses import or export).
  // Interfaces matching types from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces

  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
