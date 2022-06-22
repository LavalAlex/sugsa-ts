export function spaceSTR(arr){
    var str = ""
    for(var i =0; i< arr.length; i++){
        if(arr.length-1 == i){
            str = str +" " + arr[i] 
        }else{
            str = str + " " + arr[i] +" " + "-"
        }
    }
    return str
}