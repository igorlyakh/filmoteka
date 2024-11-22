/// <reference types="vite/client" />

declare module 'modern-normalize' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
