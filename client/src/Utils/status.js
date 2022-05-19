const status = {
    200:"ok",
    400:{error:"Email or Password was not incorrect" },
    404:{error:"Oops, something went wrong"}
}

export const statusMsg = (code)=>{
    return status[code]
}