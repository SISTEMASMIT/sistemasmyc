
export function info(){
    ls = [];
    if (localStorage.getItem("UserAgent") !== null) {
        ls.push(localStorage.getItem('UserAgent'));
        ls.push(localStorage.getItem('Local'));
        ls.push(localStorage.getItem('Net'));

    }else{
        ls.push('');
        ls.push('');
        ls.push('');
    }
    return ls;
}