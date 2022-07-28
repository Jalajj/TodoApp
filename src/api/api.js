export const getAllTodos = async (url) => {
    try{
      const res = await fetch(url, {method:'GET'});
      const response = await res.json();
      
      return response
    }catch(err){
      console.log(err)
      return err
    }
  
  }