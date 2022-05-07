const repeat = (string, times) =>{
    let result = ''
    while(times > 1){
        if(times & 1) result += string;
        times >>= 1, string+= string; 
    }
    return result+string
}