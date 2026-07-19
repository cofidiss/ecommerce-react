

export function IsLoggedIn(baseUrl: string): Promise<boolean> {

  return fetch(`${baseUrl}/api/user/isloggedIn`, {
      method: 'GET'     })
      .then((response) => {
             debugger;
        if (response.ok) {
        
          return response.text().then(data => {
            return data === 'true';
          });
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      })  
}
export function IsAdmin(baseUrl: string): Promise<boolean> {

  return fetch(`${baseUrl}/api/user/isAdmin`, {
      method: 'GET'     })
      .then((response) => {
             debugger;
        if (response.ok) {
        
          return response.text().then(data => {
            return data === 'true';
          });
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      })  
}