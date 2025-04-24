const mockAuthorize = () => (_req: any, _res: any, next: any): void => {
    next();
  };
  
  export default mockAuthorize;
  