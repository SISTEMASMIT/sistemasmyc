
export function nav_data(usuario){
    let ls = [];
    if (localStorage.getItem(btoa(usuario)) !== null) {
        let id=localStorage.getItem(btoa(usuario));
        let data = localStorage.getItem(id);
        let dataF = data.split(",");
        ls.push(localStorage.getItem(dataF[0]));
        ls.push(localStorage.getItem(dataF[1]));
        ls.push(localStorage.getItem(dataF[2]));
    }else{
        ls.push('');
        ls.push('');
        ls.push('');
    }
    return ls;
}