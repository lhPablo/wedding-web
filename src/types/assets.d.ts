declare module '*.png' {
    const value: {
      src: string;
      width: number;
      height: number;
      format: string;
    };
    export default value;
}
  
declare module '*.jpg' {
    const value: {
      src: string;
      width: number;
      height: number;
      format: string;
    };
    export default value;
}