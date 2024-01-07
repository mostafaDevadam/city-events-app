

// save
const saveItem = async (key, value) => {
    const obj = JSON.stringify(value)
    await localStorage.setItem(key, obj)
}


// get
const getItem = async (key) => {
    const res = await localStorage.getItem(key)
    if(res){
        const obj = JSON.parse(res)
        return obj
    }

}

// remove
const removeItem = async (key)=> localStorage.removeItem(key)

export const StorageService = { saveItem, getItem, removeItem}
