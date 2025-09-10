// This file extends the global Window interface

declare global {
  interface Window {
    // The '?' makes the property optional, as the script may not have loaded yet
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

// This export statement is necessary to make the file a module
export {};