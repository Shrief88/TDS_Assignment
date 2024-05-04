/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URI: string;
  readonly VITE_IMAGES_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
