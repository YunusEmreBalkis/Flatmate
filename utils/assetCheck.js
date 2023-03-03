const CustomError = require("../errors")

const assetCheck =  (asset,assetId,item) => {
    if (!asset) {
        throw new CustomError.NotFoundError(`No ${item} with that id : ${assetId}`)
    }
    return
}

module.exports = assetCheck;