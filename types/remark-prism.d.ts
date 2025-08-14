declare module 'remark-prism' {
  import { Plugin } from 'unified';
  
  interface RemarkPrismOptions {
    transformInlineCode?: boolean;
    languages?: string[];
  }
  
  const remarkPrism: Plugin<[RemarkPrismOptions?]>;
  export default remarkPrism;
}
