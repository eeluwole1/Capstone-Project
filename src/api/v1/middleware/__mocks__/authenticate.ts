const mockAuthenticate = (req: any, res: any, next: any): void => {
    res.locals.uid = "mock-uid";
    res.locals.role = "admin"; 
    next();
  };
  
  export default mockAuthenticate;
  