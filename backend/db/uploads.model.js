module.exports = mongoose => {
    const Upload = mongoose.model(
        "Upload",
        mongoose.Schema(
            {
                address: String,
                itemName: String,
                itemDesc: String,
                royalties: String,
                itemSize: Number,
                itemProperty: String,
                price: Boolean,
                looking: Boolean
            },
            { timestamps: true }
        )
    )

    return Upload;
}